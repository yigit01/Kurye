import React, { useEffect, useState } from "react";
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormHelperText,
  Snackbar,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment, // Eklenen import
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionLeft from "../../layouts/TransitionLeft";
import { useNavigate } from "react-router-dom";

type PaymentType = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER";

interface ShipmentFormData {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderID: string;
  quantity: number;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  weight: number;
  width: number;
  height: number;
  length: number;
  desi: number;
  fee: number;
  feePaid: boolean;
  paymentType: PaymentType;
}

interface CreatedShipment {
  id: string;
  trackingCode: string;
  senderName: string;
  receiverName: string;
  desi: number;
  fee: number;
  createdAt: string;
}

const CreateShipmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, setValue, reset } = useForm<ShipmentFormData>({
    defaultValues: {
      senderName: "",
      senderPhone: "",
      senderAddress: "",
      senderID: "",
      quantity: 1,
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      weight: 0,
      width: 0,
      height: 0,
      length: 0,
      desi: 0,
      fee: 0,
      feePaid: true,
      paymentType: "CASH",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [creationHistory, setCreationHistory] = useState<CreatedShipment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [deleteShipmentId, setDeleteShipmentId] = useState<string | null>(null);
  const [manualFeeEnabled, setManualFeeEnabled] = useState(false); // Manuel mod için state

  const { width, height, length, fee } = watch();

  useEffect(() => {
    // Manuel mod aktif değilse otomatik hesaplama yap
    if (!manualFeeEnabled) {
      if (width > 0 && height > 0 && length > 0) {
        const computedDesi = (width * height * length) / 3000;
        setValue("desi", parseFloat(computedDesi.toFixed(2)));
        const computedFee = computedDesi * 10;
        setValue("fee", parseFloat(computedFee.toFixed(2)));
      } else {
        setValue("desi", 0);
        setValue("fee", 0);
      }
    }
  }, [width, height, length, setValue, manualFeeEnabled]);

  const onSubmit = (data: ShipmentFormData) => {
    console.log("Kargo Giriş Verileri:", data);
    const newShipment: CreatedShipment = {
      id: new Date().getTime().toString(),
      trackingCode: "TR" + Math.floor(Math.random() * 1000000000),
      senderName: data.senderName,
      receiverName: data.receiverName,
      desi: data.desi,
      fee: data.fee,
      createdAt: new Date().toLocaleDateString("tr-TR"),
    };
    setCreationHistory((prev) => {
      const updated = [newShipment, ...prev];
      return updated.slice(0, 5);
    });
    setOpenSnackbar(true);
    reset();
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleErrorSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenErrorSnackbar(false);
  };

  const handleEditShipment = (id: string) => {
    setDialogTitle("Kargoyu Düzenle");
    setDialogMessage(`Kargo ${id} düzenleme sayfasına yönlendirilecek (Örnek).`);
    setDialogOpen(true);
  };

  const handleViewInvoice = (id: string) => {
    setDialogTitle("Fatura Görüntüle");
    setDialogMessage(`Kargo ${id} için fatura görüntülenecek (Örnek).`);
    setDialogOpen(true);
  };

  const handleViewDetails = (id: string) => {
    setDialogTitle("Kargo Ayrıntıları");
    setDialogMessage(`Kargo ${id} ayrıntıları gösterilecek (Örnek).`);
    setDialogOpen(true);
  };

  const handleDeleteShipment = (id: string) => {
    setDialogTitle("Kargoyu Sil");
    setDialogMessage(`Kargo ${id} silinecek. Onaylıyor musunuz?`);
    setDeleteShipmentId(id);
    setDialogOpen(true);
  };

  const handleDialogClose = (confirmed: boolean = false) => {
    if (dialogTitle === "Kargoyu Sil" && confirmed && deleteShipmentId) {
      setCreationHistory((prev) => prev.filter((shipment) => shipment.id !== deleteShipmentId));
      setOpenErrorSnackbar(true);
    }
    setDialogOpen(false);
    setDeleteShipmentId(null);
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h4">Yeni Kargo Girişi</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate("/cargo-management/history")}
              startIcon={<span role="img" aria-label="geçmiş">📜</span>}
            >
              Kargo Geçmişi
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Gönderici Bilgileri</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="senderName"
                control={control}
                render={({ field }) => <TextField {...field} label="Gönderici Adı" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="senderPhone"
                control={control}
                render={({ field }) => <TextField {...field} label="Gönderici Telefonu" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="senderID"
                control={control}
                render={({ field }) => <TextField {...field} label="TC/Vergi No" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="senderAddress"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Gönderici Adresi" variant="outlined" fullWidth multiline rows={3} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => <TextField {...field} label="Kargo Adedi" type="number" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Alıcı Bilgileri</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="receiverName"
                control={control}
                render={({ field }) => <TextField {...field} label="Alıcı Adı" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="receiverPhone"
                control={control}
                render={({ field }) => <TextField {...field} label="Alıcı Telefonu" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="receiverAddress"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Alıcı Adresi" variant="outlined" fullWidth multiline rows={3} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Kargo Bilgileri</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => <TextField {...field} label="Ağırlık (kg)" type="number" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="width"
                control={control}
                render={({ field }) => <TextField {...field} label="Genişlik (cm)" type="number" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="height"
                control={control}
                render={({ field }) => <TextField {...field} label="Yükseklik (cm)" type="number" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="length"
                control={control}
                render={({ field }) => <TextField {...field} label="Uzunluk (cm)" type="number" variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="desi"
                control={control}
                render={({ field }) => <TextField {...field} label="Desi (Otomatik)" variant="outlined" fullWidth disabled />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="fee"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={`Ücret ₺ (${manualFeeEnabled ? "Manuel" : "Otomatik"})`}
                    variant="outlined"
                    fullWidth
                    disabled={!manualFeeEnabled}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={() => setManualFeeEnabled((prev) => !prev)} size="small">
                            {manualFeeEnabled ? "Otomatik" : "Manuel"}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ödeme</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <Typography variant="subtitle1">Ücret Ödeme Durumu</Typography>
                <Controller
                  name="feePaid"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value={true} control={<Radio />} label="Ödendi" />
                      <FormControlLabel value={false} control={<Radio />} label="Ödenmedi" />
                    </RadioGroup>
                  )}
                />
                <FormHelperText>
                  Ücret ödendiyse "Ödendi", değilse "Ödenmedi" seçiniz.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" align="center">
                Toplam Ücret: {fee} ₺
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" size="large">
                Kargo Oluştur
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box mt={4}>
          <Typography variant="h6" gutterBottom align="center">
            Son Girilen 5 Kargo
          </Typography>
          {creationHistory.length === 0 ? (
            <Typography align="center">Henüz kargo oluşturulmadı.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Takip Kodu</TableCell>
                    <TableCell>Gönderen</TableCell>
                    <TableCell>Alıcı</TableCell>
                    <TableCell>Desi</TableCell>
                    <TableCell>Ücret</TableCell>
                    <TableCell>Tarih</TableCell>
                    <TableCell>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creationHistory.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.trackingCode}</TableCell>
                      <TableCell>{shipment.senderName}</TableCell>
                      <TableCell>{shipment.receiverName}</TableCell>
                      <TableCell>{shipment.desi}</TableCell>
                      <TableCell>{shipment.fee} ₺</TableCell>
                      <TableCell>{shipment.createdAt}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEditShipment(shipment.id)}
                          color="primary"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleViewInvoice(shipment.id)}
                          color="secondary"
                        >
                          <ReceiptIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(shipment.id)}
                          color="info"
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteShipment(shipment.id)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
          action={
            <IconButton size="small" aria-label="kapat" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          Kargo başarıyla oluşturuldu!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
      >
        <Alert
          onClose={handleErrorSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
          action={
            <IconButton size="small" aria-label="kapat" color="inherit" onClick={handleErrorSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          Kargo başarıyla silindi.
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {dialogTitle === "Kargoyu Sil" ? (
            <>
              <Button onClick={() => handleDialogClose(true)} color="error">
                Evet
              </Button>
              <Button onClick={() => handleDialogClose(false)}>Hayır</Button>
            </>
          ) : (
            <Button onClick={() => setDialogOpen(false)}>Tamam</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateShipmentPage;
