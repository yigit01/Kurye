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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createCourier } from "../../store/courier/courierSlice";

interface CreateCourierModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  branchId?: string;
}

const CreateCourierModal: React.FC<CreateCourierModalProps> = ({
  open,
  onClose,
  onSuccess,
  branchId,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    identificationNumber: "",
    region: "",
    branchId: branchId || "",
  });

  useEffect(() => {
    if (open) {
      setError(null);
      setFormData((prev) => ({
        ...prev,
        branchId: branchId || "",
      }));
    }
  }, [open, branchId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.branchId) {
      setError("Lütfen önce bir şube seçin");
      return;
    }

    try {
      const result = await dispatch(createCourier(formData) as any).unwrap();
      onSuccess?.();
      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        identificationNumber: "",
        region: "",
        branchId: branchId || "",
      });
    } catch (error: any) {
      setError(error.message || "Kurye oluşturulurken bir hata oluştu");
      console.error("Kurye oluşturulurken hata:", error);
    }
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
            <TextField
              name="fullName"
              label="Ad Soyad"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
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
              name="phone"
              label="Telefon"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="identificationNumber"
              label="TC Kimlik No"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="region"
              label="Bölge"
              value={formData.region}
              onChange={handleChange}
              required
              fullWidth
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
