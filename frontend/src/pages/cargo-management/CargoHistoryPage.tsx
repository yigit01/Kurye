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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentSelector, { AssignmentOption } from "../../components/cargo-management/AssignmentSelector";

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

const availableBranches = ["Şube A", "Şube B", "Şube C"];

const CargoHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyShipments, setHistoryShipments] = useState<Shipment[]>(initialHistoryShipments);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  
  const filteredHistory = historyShipments.filter(
    (s) => selectedBranches.length === 0 || selectedBranches.includes(s.branch)
  );
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

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Tüm Kargo Geçmişi</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cargo-management")}
        >
          Geri
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

      <Paper sx={{ p: 2 }}>
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
