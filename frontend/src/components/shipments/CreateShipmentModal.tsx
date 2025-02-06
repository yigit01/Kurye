//frontend\src\components\shipments\CreateShipmentModal.tsx
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
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createShipment } from "../../store/slices/shipmentSlice";
import { RootState } from "../../store";
import { PaymentType } from "../../types/shipment";

interface CreateShipmentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateShipmentModal: React.FC<CreateShipmentModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    paymentType: "" as PaymentType,
    amount: "",
    dimensions: {
      weight: "",
      width: "",
      height: "",
      length: "",
    },
  });

  useEffect(() => {
    if (open) {
      setError(null);
      setFormData({
        recipientName: "",
        recipientPhone: "",
        recipientAddress: "",
        paymentType: "" as PaymentType,
        amount: "",
        dimensions: {
          weight: "",
          width: "",
          height: "",
          length: "",
        },
      });
    }
  }, [open]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("dimensions.")) {
      const dimensionField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimensionField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const submitData = {
      ...formData,
      amount: Number(formData.amount),
      dimensions: Object.entries(formData.dimensions).every(
        ([_, value]) => value === ""
      )
        ? undefined
        : {
            weight: Number(formData.dimensions.weight),
            width: Number(formData.dimensions.width),
            height: Number(formData.dimensions.height),
            length: Number(formData.dimensions.length),
          },
    };

    try {
      await dispatch(createShipment(submitData) as any).unwrap();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      setError(error.message || "Kargo oluşturulurken bir hata oluştu");
      console.error("Kargo oluşturulurken hata:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Kargo Oluştur</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              name="recipientName"
              label="Alıcı Adı"
              value={formData.recipientName}
              onChange={handleTextChange}
              required
              fullWidth
            />
            <TextField
              name="recipientPhone"
              label="Alıcı Telefon"
              value={formData.recipientPhone}
              onChange={handleTextChange}
              required
              fullWidth
            />
            <TextField
              name="recipientAddress"
              label="Alıcı Adresi"
              value={formData.recipientAddress}
              onChange={handleTextChange}
              required
              fullWidth
              multiline
              rows={3}
            />
            <FormControl fullWidth required>
              <InputLabel>Ödeme Tipi</InputLabel>
              <Select
                name="paymentType"
                value={formData.paymentType}
                label="Ödeme Tipi"
                onChange={handleSelectChange}
              >
                <MenuItem value={PaymentType.CASH}>Nakit</MenuItem>
                <MenuItem value={PaymentType.CREDIT_CARD}>Kredi Kartı</MenuItem>
                <MenuItem value={PaymentType.BANK_TRANSFER}>
                  Banka Transferi
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="amount"
              label="Tutar"
              type="number"
              value={formData.amount}
              onChange={handleTextChange}
              required
              fullWidth
              inputProps={{ min: 0, step: "0.01" }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Kargo Boyutları (Opsiyonel)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="dimensions.weight"
                    label="Ağırlık (kg)"
                    type="number"
                    value={formData.dimensions.weight}
                    onChange={handleTextChange}
                    fullWidth
                    inputProps={{ min: 0, step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="dimensions.width"
                    label="Genişlik (cm)"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={handleTextChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="dimensions.height"
                    label="Yükseklik (cm)"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={handleTextChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="dimensions.length"
                    label="Uzunluk (cm)"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={handleTextChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </Box>
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

export default CreateShipmentModal;
