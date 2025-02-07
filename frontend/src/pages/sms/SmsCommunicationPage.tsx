import React, { useState, useMemo } from "react";
import { 
  Box, 
  Tabs, 
  Tab, 
  Paper, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  FormHelperText 
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import SmsIcon from "@mui/icons-material/Sms";

// TabPanel bileşeni: MUI örneğinden uyarlanmıştır.
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sms-tabpanel-${index}`}
      aria-labelledby={`sms-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `sms-tab-${index}`,
    "aria-controls": `sms-tabpanel-${index}`,
  };
}

// Dummy müşteri listesi (gerçek uygulamada API'den çekilebilir)
interface Customer {
  id: string;
  name: string;
  phone: string;
}
const customers: Customer[] = [
  { id: "1", name: "Ali Veli", phone: "05551234567" },
  { id: "2", name: "Ayşe Yılmaz", phone: "05557654321" },
  { id: "3", name: "Mehmet Can", phone: "05559876543" },
  // Daha fazla müşteri ekleyebilirsiniz.
];

const SmsCommunicationPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Kampanya SMS sekmesi için form alanları:
  const [campaignMessage, setCampaignMessage] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  // Mesaj uzunluğuna göre kaç SMS segmenti oluşacağını hesaplayalım (her 160 karakter=1 SMS)
  const messageSegments = useMemo(() => {
    return campaignMessage.length > 0 ? Math.ceil(campaignMessage.length / 160) : 0;
  }, [campaignMessage]);

  // Toplam gönderilecek SMS sayısı: seçilen müşteri sayısı * segment sayısı
  const totalSmsCount = selectedCustomers.length * messageSegments;

  // OTP ve Kargo & Teslim SMS ayarları için form alanları:
  const [otpTemplate, setOtpTemplate] = useState("Your OTP is {OTP}");
  const [cargoStatusSms, setCargoStatusSms] = useState("Your cargo is on the way.");
  const [deliverySms, setDeliverySms] = useState("Your cargo has been delivered.");

  const handleSendCampaignSms = () => {
    // Gerçek uygulamada API çağrısı veya başka mantık ekleyin.
    alert(`Kampanya SMS gönderilecek:
Mesaj: ${campaignMessage}
SMS Segment Sayısı: ${messageSegments}
Seçilen Müşteri Sayısı: ${selectedCustomers.length}
Toplam Gönderilecek SMS: ${totalSmsCount}`);
  };

  const handleSaveOtpTemplate = () => {
    alert(`OTP Şablonu kaydedildi: ${otpTemplate}`);
  };

  const handleSaveCargoSmsSettings = () => {
    alert(`Kargo SMS ayarları kaydedildi:
Kargo Durum: ${cargoStatusSms}
Teslim: ${deliverySms}`);
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SmsIcon color="primary" fontSize="large" />
          </Grid>
          <Grid item>
            <Typography variant="h4">SMS İleti Ayarları</Typography>
          </Grid>
        </Grid>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="SMS İleti Sekmeleri">
          <Tab label="Kampanya SMS" {...a11yProps(0)} />
          <Tab label="OTP Şablon Ayarları" {...a11yProps(1)} />
          <Tab label="Kargo & Teslim SMS Ayarları" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Kampanya SMS Gönderimi</Typography>
          <Grid container spacing={2}>
            {/* SMS Mesajı */}
            <Grid item xs={12}>
              <TextField
                label="SMS Mesajı"
                multiline
                rows={4}
                fullWidth
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                helperText="Bir SMS 160 karakterden oluşur."
              />
            </Grid>
            {/* Müşteri Seçimi */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={customers}
                getOptionLabel={(option) => `${option.name} (${option.phone})`}
                onChange={(event, value) => setSelectedCustomers(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Müşteriler" placeholder="Müşteri seçiniz" />
                )}
              />
            </Grid>
            {/* SMS Bilgileri */}
            <Grid item xs={12}>
              <Typography variant="body1">
                SMS Mesajı {campaignMessage.length} karakter, {messageSegments} SMS segmenti oluşturuyor.
              </Typography>
              <Typography variant="body1">
                Seçilen Müşteri Sayısı: {selectedCustomers.length}. Toplam Gönderilecek SMS: {totalSmsCount}.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSendCampaignSms}>
                Kampanya SMS Gönder
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>OTP Şablon Ayarları</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="OTP Şablonu"
                fullWidth
                value={otpTemplate}
                onChange={(e) => setOtpTemplate(e.target.value)}
                helperText="Örneğin: Your OTP is {OTP}"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveOtpTemplate}>
                Şablonu Kaydet
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>Kargo & Teslim SMS Ayarları</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Kargo Durum SMS Mesajı"
                fullWidth
                value={cargoStatusSms}
                onChange={(e) => setCargoStatusSms(e.target.value)}
                helperText="Örneğin: Your cargo is on the way."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teslim SMS Mesajı"
                fullWidth
                value={deliverySms}
                onChange={(e) => setDeliverySms(e.target.value)}
                helperText="Örneğin: Your cargo has been delivered."
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSaveCargoSmsSettings}>
                Ayarları Kaydet
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default SmsCommunicationPage;
