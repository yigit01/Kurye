// src/pages/cargo-management/CargoHistoryPage.tsx
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
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Menu,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentSelector, { AssignmentOption } from "../../components/cargo-management/AssignmentSelector";

interface Shipment {
  id: string;
  trackingCode: string;
  senderName: string;       // Gönderenin adı
  receiverName: string;     // Alıcının adı
  desi: number;
  fee: number;
  currentLocation: string;
  destination: string;
  assignment: AssignmentOption | null;
  branch: string;
}

const initialHistoryShipments: Shipment[] = [
  {
    id: "3",
    trackingCode: "TR555555555",
    senderName: "Ali Veli",
    receiverName: "Ayşe Yılmaz",
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
    senderName: "Mehmet Demir",
    receiverName: "Fatma Öz",
    desi: 22,
    fee: 55,
    currentLocation: "İstanbul",
    destination: "Bursa",
    assignment: { id: "d1", name: "Depo 1", type: "Depolar" },
    branch: "Şube B",
  },
];

const availableBranches = ["Şube A", "Şube B", "Şube C"];

// Tabloda görüntülenebilecek sütunlar (İşlemler sütunu her zaman gösterilecektir)
const allColumns = [
  { id: "trackingCode", label: "Takip Kodu" },
  { id: "senderName", label: "Gönderen" },
  { id: "receiverName", label: "Alıcı" },
  { id: "desi", label: "Desi" },
  { id: "fee", label: "Ücret" },
  { id: "currentLocation", label: "Mevcut Konum" },
  { id: "destination", label: "Gideceği Konum" },
  { id: "branch", label: "Şube" },
  { id: "assignment", label: "Atama" },
];

const CargoHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyShipments, setHistoryShipments] = useState<Shipment[]>(initialHistoryShipments);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  // Sütun seçim menüsü için state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleColumnMenuClose = () => {
    setAnchorEl(null);
  };
  const [visibleColumns, setVisibleColumns] = useState<string[]>(allColumns.map((col) => col.id));
  const handleToggleColumn = (columnId: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnId) ? prev.filter((id) => id !== columnId) : [...prev, columnId]
    );
  };

  // Filtreleme: Şube ve arama terimine göre (takip kodu, gönderen adı, alıcı adı)
  const filteredHistory = historyShipments.filter((s) => {
    const branchMatch = selectedBranches.length === 0 || selectedBranches.includes(s.branch);
    const searchMatch =
      searchTerm.trim() === "" ||
      s.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.receiverName.toLowerCase().includes(searchTerm.toLowerCase());
    return branchMatch && searchMatch;
  });
  const paginatedHistory = filteredHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const [editingHistoryId, setEditingHistoryId] = useState<string | null>(null);
  const [editedAssignment, setEditedAssignment] = useState<AssignmentOption | null>(null);

  const handleHistoryPageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleEditHistory = (shipment: Shipment) => {
    setEditingHistoryId(shipment.id);
    setEditedAssignment(shipment.assignment);
  };

  const handleSaveHistoryEdit = (id: string) => {
    setHistoryShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, assignment: editedAssignment } : s))
    );
    setEditingHistoryId(null);
    setEditedAssignment(null);
  };

  const handleRemoveAssignment = (id: string) => {
    setHistoryShipments((prev) => prev.filter((s) => s.id !== id));
    if (editingHistoryId === id) {
      setEditingHistoryId(null);
      setEditedAssignment(null);
    }
  };

  const handleBranchFilterChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedBranches(typeof value === "string" ? value.split(",") : value);
    setPage(0);
  };

  // Örnek: Gönderi bilgilerini görüntüleme işlevi (detayları bir alert ile gösteriyoruz)
  const handleViewShipment = (shipment: Shipment) => {
    alert(
      `Gönderi Bilgileri:\nTakip Kodu: ${shipment.trackingCode}\nGönderen: ${shipment.senderName}\nAlıcı: ${shipment.receiverName}\nDesi: ${shipment.desi}\nÜcret: ${shipment.fee} ₺\nMevcut Konum: ${shipment.currentLocation}\nGideceği Konum: ${shipment.destination}\nŞube: ${shipment.branch}`
    );
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Tüm Kargo Geçmişi</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cargo-management")}
        >
          Atama sayfasına dön
        </Button>
      </Box>

      {/* Filtreleme Alanı: Şube, Arama ve Sütun Seçimi */}
      <Box display="flex" alignItems="center" mb={2} gap={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 250 }} size="small">
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

        <TextField
          label="Arama"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{ minWidth: 250, backgroundColor: "white" }}
        />

        <Button variant="outlined" onClick={handleColumnMenuOpen}>
          Sütun Seçimi
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleColumnMenuClose}>
          {allColumns.map((col) => (
            <MenuItem key={col.id}>
              <Checkbox
                checked={visibleColumns.includes(col.id)}
                onChange={() => handleToggleColumn(col.id)}
              />
              <ListItemText primary={col.label} />
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Paper sx={{ p: 2 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {visibleColumns.includes("trackingCode") && <TableCell>Takip Kodu</TableCell>}
                {visibleColumns.includes("senderName") && <TableCell>Gönderen</TableCell>}
                {visibleColumns.includes("receiverName") && <TableCell>Alıcı</TableCell>}
                {visibleColumns.includes("desi") && <TableCell>Desi</TableCell>}
                {visibleColumns.includes("fee") && <TableCell>Ücret</TableCell>}
                {visibleColumns.includes("currentLocation") && <TableCell>Mevcut Konum</TableCell>}
                {visibleColumns.includes("destination") && <TableCell>Gideceği Konum</TableCell>}
                {visibleColumns.includes("branch") && <TableCell>Şube</TableCell>}
                {visibleColumns.includes("assignment") && <TableCell>Atama</TableCell>}
                <TableCell>İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedHistory.map((shipment) => (
                <TableRow key={shipment.id}>
                  {visibleColumns.includes("trackingCode") && <TableCell>{shipment.trackingCode}</TableCell>}
                  {visibleColumns.includes("senderName") && <TableCell>{shipment.senderName}</TableCell>}
                  {visibleColumns.includes("receiverName") && <TableCell>{shipment.receiverName}</TableCell>}
                  {visibleColumns.includes("desi") && <TableCell>{shipment.desi}</TableCell>}
                  {visibleColumns.includes("fee") && <TableCell>{shipment.fee} ₺</TableCell>}
                  {visibleColumns.includes("currentLocation") && <TableCell>{shipment.currentLocation}</TableCell>}
                  {visibleColumns.includes("destination") && <TableCell>{shipment.destination}</TableCell>}
                  {visibleColumns.includes("branch") && <TableCell>{shipment.branch}</TableCell>}
                  {visibleColumns.includes("assignment") && (
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
                      ) : shipment.assignment ? (
                        `${shipment.assignment.type} - ${shipment.assignment.name}`
                      ) : (
                        "Atama Yok"
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <IconButton onClick={() => handleViewShipment(shipment)} title="Gönderi Bilgilerini Görüntüle">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    {editingHistoryId === shipment.id ? (
                      <Button variant="contained" size="small" onClick={() => handleSaveHistoryEdit(shipment.id)}>
                        Kaydet
                      </Button>
                    ) : (
                      <>
                        <Button variant="outlined" size="small" onClick={() => handleEditHistory(shipment)}>
                          Düzenle
                        </Button>{" "}
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleRemoveAssignment(shipment.id)}
                        >
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
          page={page}
          onPageChange={handleHistoryPageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </Paper>
    </Box>
  );
};

export default CargoHistoryPage;
