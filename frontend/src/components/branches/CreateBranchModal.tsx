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
import { createBranch } from "../../store/slices/branchSlice";

interface CreateBranchModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateBranchModal: React.FC<CreateBranchModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (open) {
      setError(null);
      setFormData({
        name: "",
        address: "",
        phone: "",
      });
    }
  }, [open]);

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

    try {
      await dispatch(createBranch(formData) as any).unwrap();
      onSuccess?.();
      onClose();
      setFormData({
        name: "",
        address: "",
        phone: "",
      });
    } catch (error: any) {
      setError(error.message || "Şube oluşturulurken bir hata oluştu");
      console.error("Şube oluşturulurken hata:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Şube Oluştur</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              name="name"
              label="Şube Adı"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="address"
              label="Adres"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="phone"
              label="Telefon"
              value={formData.phone}
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

export default CreateBranchModal;
