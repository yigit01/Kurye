import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCourier } from "../../store/courier/courierSlice";
import { fetchBranches } from "../../store/slices/branchSlice";
import { RootState } from "../../store";

interface CreateCourierModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCourierModal: React.FC<CreateCourierModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    identificationNumber: "",
    branchId: "",
    region: "TR",
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const branches = useSelector((state: RootState) => state.branch.branches);

  useEffect(() => {
    if (open) {
      dispatch(fetchBranches() as any);
      setError(null);
      setPasswordError(null);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        identificationNumber: "",
        branchId: "",
        region: "TR",
      });
    }
  }, [open, dispatch]);

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumberOrSpecial = /[\d\W]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough) {
      setPasswordError("Şifre en az 6 karakter uzunluğunda olmalıdır");
      return false;
    }

    if (!(hasUpperCase && hasLowerCase && hasNumberOrSpecial)) {
      setPasswordError(
        "Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam veya özel karakter içermelidir"
      );
      return false;
    }

    setPasswordError(null);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));

    if (name === "password") {
      validatePassword(value as string);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.branchId) {
      setError("Lütfen bir şube seçin");
      return;
    }

    if (!validatePassword(formData.password)) {
      return;
    }

    if (formData.phone.length < 10 || !/^\d+$/.test(formData.phone)) {
      setError(
        "Telefon numarası en az 10 haneli olmalı ve sadece rakam içermelidir"
      );
      return;
    }

    if (formData.identificationNumber.length < 10) {
      setError("TC Kimlik No en az 10 haneli olmalıdır");
      return;
    }

    try {
      await dispatch(createCourier(formData) as any).unwrap();
      onSuccess?.();
      onClose();
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        identificationNumber: "",
        branchId: "",
        region: "TR",
      });
    } catch (error: any) {
      setError(error.message || "Kurye oluşturulurken bir hata oluştu");
      console.error("Kurye oluşturulurken hata:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      identificationNumber: "",
      branchId: "",
      region: "TR",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Kurye Oluştur</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <FormControl fullWidth required>
              <InputLabel id="branch-select-label">Şube</InputLabel>
              <Select
                labelId="branch-select-label"
                id="branch-select"
                name="branchId"
                value={formData.branchId}
                label="Şube"
                onChange={handleSelectChange}
              >
                {branches?.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="fullName"
              label="Ad Soyad"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ minLength: 2 }}
            />
            <TextField
              name="email"
              label="E-posta"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="password"
              label="Şifre"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              name="phone"
              label="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{
                minLength: 10,
                pattern: "[0-9]*",
              }}
              helperText="En az 10 haneli ve sadece rakam"
            />
            <TextField
              name="identificationNumber"
              label="TC Kimlik No"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ minLength: 10 }}
              helperText="En az 10 haneli"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>İptal</Button>
          <Button type="submit" variant="contained" color="primary">
            Oluştur
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCourierModal;
