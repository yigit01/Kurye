// src/pages/create-shipment/CreateShipmentPage.tsx
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

type PaymentType = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER";

interface ShipmentFormData {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  weight: number;
  width: number;
  height: number;
  length: number;
  desi: number;
  fee: number;
  paymentType: PaymentType;
}

const CreateShipmentPage: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<ShipmentFormData>({
    defaultValues: {
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      weight: 0,
      width: 0,
      height: 0,
      length: 0,
      desi: 0,
      fee: 0,
      paymentType: "CASH",
    },
  });

  // İzlenen değerler: genişlik, yükseklik, uzunluk
  const { width, height, length } = watch();

  useEffect(() => {
    // Eğer tüm boyutlar girildiyse desi hesaplaması yapılır
    if (width > 0 && height > 0 && length > 0) {
      // Örnek: Desi = (width * height * length) / 3000
      const computedDesi = (width * height * length) / 3000;
      setValue("desi", parseFloat(computedDesi.toFixed(2)));
      // Ücret hesaplaması örneğin desi * 10 olarak yapılabilir
      const computedFee = computedDesi * 10;
      setValue("fee", parseFloat(computedFee.toFixed(2)));
    } else {
      setValue("desi", 0);
      setValue("fee", 0);
    }
  }, [width, height, length, setValue]);

  const onSubmit = (data: ShipmentFormData) => {
    console.log("Kargo Giriş Verileri:", data);
    // Burada API çağrısı veya Redux aksiyonu ile verileri gönderebilirsiniz.
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Yeni Kargo Girişi
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Gönderici Bilgileri */}
          <Typography variant="h6" mt={2}>
            Gönderici Bilgileri
          </Typography>
          <Controller
            name="senderName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Gönderici Adı" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="senderPhone"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Gönderici Telefonu" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="senderAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Gönderici Adresi"
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            )}
          />

          {/* Alıcı Bilgileri */}
          <Typography variant="h6" mt={2}>
            Alıcı Bilgileri
          </Typography>
          <Controller
            name="receiverName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Alıcı Adı" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="receiverPhone"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Alıcı Telefonu" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="receiverAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Alıcı Adresi"
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            )}
          />

          {/* Kargo Bilgileri */}
          <Typography variant="h6" mt={2}>
            Kargo Bilgileri
          </Typography>
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Ağırlık (kg)" type="number" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Genişlik (cm)" type="number" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Yükseklik (cm)" type="number" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="length"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Uzunluk (cm)" type="number" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="desi"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Desi (Otomatik Hesaplanır)"
                fullWidth
                margin="normal"
                disabled
              />
            )}
          />
          <Controller
            name="fee"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ücret (Otomatik Hesaplanır)"
                fullWidth
                margin="normal"
                disabled
              />
            )}
          />

          {/* Ödeme Tipi */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Ödeme Tipi</InputLabel>
            <Controller
              name="paymentType"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Ödeme Tipi">
                  <MenuItem value="CASH">Nakit</MenuItem>
                  <MenuItem value="CREDIT_CARD">Kredi Kartı</MenuItem>
                  <MenuItem value="BANK_TRANSFER">Banka Transferi</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Kargoyu Kaydet
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateShipmentPage;
