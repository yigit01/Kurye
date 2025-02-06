//frontend\src\components\users\CreateUserModal.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { createUser } from "../../store/user/userSlice";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createUser(formData)).unwrap();
      onSuccess();
      onClose();
      setFormData({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        role: "user",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Kullanıcı Oluştur</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            name="email"
            label="E-posta"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="password"
            label="Şifre"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="fullName"
            label="Ad Soyad"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            label="Telefon"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              value={formData.role}
              label="Rol"
              onChange={handleRoleChange}
            >
              <MenuItem value="user">Kullanıcı</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="courier">Kurye</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained">
          Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;
