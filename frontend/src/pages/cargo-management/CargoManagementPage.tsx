// src/pages/cargo-management/CargoManagementPage.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
  TablePagination,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AssignmentSelector, { AssignmentOption } from "../../components/cargo-management/AssignmentSelector";

// Shipment tipi – ek olarak hangi şubeye ait olduğu bilgisi de var.
interface Shipment {
  id: string;
  trackingCode: string;
  desi: number;
  fee: number;
  currentLocation: string;
  destination: string;
  assignment: AssignmentOption | null;
  branch: string;
}

// Dummy veriler
const initialPendingShipments: Shipment[] = [
  {
    id: "1",
    trackingCode: "TR123456789",
    desi: 20,
    fee: 50,
    currentLocation: "İstanbul",
    destination: "Ankara",
    assignment: null,
    branch: "Şube A",
  },
  {
    id: "2",
    trackingCode: "TR987654321",
    desi: 15,
    fee: 40,
    currentLocation: "İzmir",
    destination: "Bursa",
    assignment: null,
    branch: "Şube B",
  },
];

const initialHistoryShipments: Shipment[] = [
  {
    id: "3",
    trackingCode: "TR555555555",
    desi: 18,
    fee: 45,
    currentLocation: "Antalya",
    destination: "Eskişehir",
    assignment: { id: "c1", name: "Kurye 1", type: "Kuryeler" },
    branch: "Şube A",
  },
  {
    id: "4",
    trackingCode: "TR444444444",
    desi: 22,
    fee: 55,
    currentLocation: "İstanbul",
    destination: "Bursa",
    assignment: { id: "d1", name: "Depo 1", type: "Depolar" },
    branch: "Şube B",
  },
];

// Örnek atama seçenekleri – assignmentOptions tanımını ekliyoruz:
const courierOptions: AssignmentOption[] = [
  { id: "c1", name: "Kurye 1", type: "Kuryeler" },
  { id: "c2", name: "Kurye 2", type: "Kuryeler" },
  { id: "c3", name: "Kurye 3", type: "Kuryeler" },
];
const depotOptions: AssignmentOption[] = [
  { id: "d1", name: "Depo 1", type: "Depolar" },
  { id: "d2", name: "Depo 2", type: "Depolar" },
];
const truckOptions: AssignmentOption[] = [
  { id: "t1", name: "Tır 1", type: "Tırlar" },
  { id: "t2", name: "Tır 2", type: "Tırlar" },
];
const assignmentOptions: AssignmentOption[] = [
  ...courierOptions,
  ...depotOptions,
  ...truckOptions,
];

// Şube filtrelemesi için örnek şubeler
const availableBranches = ["Şube A", "Şube B", "Şube C"];

const CargoManagementPage: React.FC = () => {
  const navigate = useNavigate();

  // Pending ve geçmiş kargoların state'leri
  const [pendingShipments, setPendingShipments] = useState<Shipment[]>(initialPendingShipments);
  const [historyShipments, setHistoryShipments] = useState<Shipment[]>(initialHistoryShipments);

  // Geçmiş inline düzenleme için state'ler
  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editedAssignment, setEditedAssignment] = useState<AssignmentOption | null>(null);

  // Şube filtreleme için state
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // Filtreleme: seçili şube yoksa tüm pending/geçmiş kargoları, varsa sadece eşleşenler
  const filteredPending = pendingShipments.filter(
    (s) => selectedBranches.length === 0 || selectedBranches.includes(s.branch)
  );
  const filteredHistory = historyShipments.filter(
    (s) => selectedBranches.length === 0 || selectedBranches.includes(s.branch)
  );

  // Pending tablosunda atama güncellemesi
  const handlePendingAssignmentChange = (id: string, newAssignment: AssignmentOption | null) => {
    setPendingShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === id ? { ...shipment, assignment: newAssignment } : shipment
      )
    );
  };

  // Pending kargoda atamayı onayla ve geçmişe taşı
  const handleConfirmPending = (id: string) => {
    const shipment = pendingShipments.find((s) => s.id === id);
    if (shipment && shipment.assignment) {
      setHistoryShipments((prev) => [...prev, shipment]);
      setPendingShipments((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Geçmiş tablosunda inline düzenleme modunu başlat
  const handleEditHistory = (shipment: Shipment) => {
    setEditingHistoryId(shipment.id);
    setEditedAssignment(shipment.assignment);
  };

  // Inline düzenlemeyi kaydet
  const handleSaveHistoryEdit = (id: string) => {
    setHistoryShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, assignment: editedAssignment } : s))
    );
    setEditingHistoryId(null);
    setEditedAssignment(null);
  };

  // "Atamayı Kaldır" butonuna basıldığında, ilgili kargo geçmişten tamamen silinsin
  const handleRemoveAssignment = (id: string) => {
    setHistoryShipments((prev) => prev.filter((s) => s.id !== id));
    if (editingHistoryId === id) {
      setEditingHistoryId(null);
      setEditedAssignment(null);
    }
  };

  // Geçmiş işlemler için sayfalama (örneğin, 5 satır/sayfa)
  const [historyPage, setHistoryPage] = useState(0);
  const rowsPerPage = 5;
  const paginatedHistory = filteredHistory.slice(historyPage * rowsPerPage, historyPage * rowsPerPage + rowsPerPage);

  const handleHistoryPageChange = (event: unknown, newPage: number) => {
    setHistoryPage(newPage);
  };

  // Şube filtresi değişikliği
  const handleBranchFilterChange = (event: any) => {
    const { target: { value } } = event;
    setSelectedBranches(typeof value === "string" ? value.split(",") : value);
    setHistoryPage(0);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Kargo Yönetimi</Typography>
        {/* Üstte de "Geçmişi Gör" butonu ekledik */}
        <Button variant="outlined" onClick={() => navigate("/cargo-management/history")} startIcon={<span>📜</span>}>
          Geçmişi Gör
        </Button>
      </Box>

      {/* Şube Filtreleme */}
      <FormControl sx={{ mb: 2, minWidth: 250 }} size="small">
        <InputLabel>Şube Seçiniz</InputLabel>
        <Select
          multiple
          value={selectedBranches}
          onChange={handleBranchFilterChange}
          input={<OutlinedInput label="Şube Seçiniz" sx={{ backgroundColor: "white" }} />}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {availableBranches.map((branch) => (
            <MenuItem key={branch} value={branch}>
              <Checkbox checked={selectedBranches.indexOf(branch) > -1} />
              <ListItemText primary={branch} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Atama Bekleyen Kargolar Tablosu */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Atama Bekleyen Kargolar
        </Typography>
        {filteredPending.length === 0 ? (
          <Typography>Atama bekleyen kargo bulunmamaktadır.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Takip Kodu</TableCell>
                  <TableCell>Desi</TableCell>
                  <TableCell>Ücret</TableCell>
                  <TableCell>Mevcut Konum</TableCell>
                  <TableCell>Gideceği Konum</TableCell>
                  <TableCell>Şube</TableCell>
                  <TableCell>Atama</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPending.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>{shipment.trackingCode}</TableCell>
                    <TableCell>{shipment.desi}</TableCell>
                    <TableCell>{shipment.fee} ₺</TableCell>
                    <TableCell>{shipment.currentLocation}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.branch}</TableCell>
                    <TableCell>
                      <AssignmentSelector
                        value={shipment.assignment}
                        onChange={(newValue) => handlePendingAssignmentChange(shipment.id, newValue)}
                        options={assignmentOptions}
                        label="Atama"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleConfirmPending(shipment.id)}
                        disabled={!shipment.assignment}
                      >
                        Onayla
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Geçmiş İşlemler Tablosu (Sayfalı) */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Geçmiş İşlemler</Typography>
          <Button variant="outlined" size="small" onClick={() => navigate("/cargo-management/history")}>
            Tüm Geçmişi Gör
          </Button>
        </Box>
        {filteredHistory.length === 0 ? (
          <Typography>Geçmiş işlem bulunmamaktadır.</Typography>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Takip Kodu</TableCell>
                    <TableCell>Desi</TableCell>
                    <TableCell>Ücret</TableCell>
                    <TableCell>Mevcut Konum</TableCell>
                    <TableCell>Gideceği Konum</TableCell>
                    <TableCell>Şube</TableCell>
                    <TableCell>Atama</TableCell>
                    <TableCell>İşlemler</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedHistory.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell>{shipment.trackingCode}</TableCell>
                      <TableCell>{shipment.desi}</TableCell>
                      <TableCell>{shipment.fee} ₺</TableCell>
                      <TableCell>{shipment.currentLocation}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>{shipment.branch}</TableCell>
                      <TableCell>
                        {editingHistoryId === shipment.id ? (
                          <AssignmentSelector
                            value={editedAssignment}
                            onChange={(newValue) => setEditedAssignment(newValue)}
                            options={[
                              { id: "c1", name: "Kurye 1", type: "Kuryeler" },
                              { id: "c2", name: "Kurye 2", type: "Kuryeler" },
                              { id: "d1", name: "Depo 1", type: "Depolar" },
                              { id: "d2", name: "Depo 2", type: "Depolar" },
                              { id: "t1", name: "Tır 1", type: "Tırlar" },
                              { id: "t2", name: "Tır 2", type: "Tırlar" },
                            ]}
                            label="Atama"
                          />
                        ) : (
                          shipment.assignment
                            ? `${shipment.assignment.type} - ${shipment.assignment.name}`
                            : "Atama Yok"
                        )}
                      </TableCell>
                      <TableCell>
                        {editingHistoryId === shipment.id ? (
                          <Button variant="contained" size="small" onClick={() => handleSaveHistoryEdit(shipment.id)}>
                            Kaydet
                          </Button>
                        ) : (
                          <>
                            <Button variant="outlined" size="small" onClick={() => handleEditHistory(shipment)}>
                              Düzenle
                            </Button>{" "}
                            <Button variant="outlined" size="small" color="error" onClick={() => handleRemoveAssignment(shipment.id)}>
                              Atamayı Kaldır
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredHistory.length}
              page={historyPage}
              onPageChange={handleHistoryPageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default CargoManagementPage;
