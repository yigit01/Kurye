// src/pages/create-shipment/ShipmentCreationHistoryPage.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

interface ShipmentHistory {
  id: string;
  trackingCode: string;
  sender: string;
  receiver: string;
  desi: number;
  fee: number;
  createdAt: string;
}

const dummyHistory: ShipmentHistory[] = [
  {
    id: "1",
    trackingCode: "TR123456789",
    sender: "Ali Veli",
    receiver: "Ahmet Yılmaz",
    desi: 12.3,
    fee: 123,
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    trackingCode: "TR987654321",
    sender: "Mehmet Can",
    receiver: "Ayşe Demir",
    desi: 10.5,
    fee: 105,
    createdAt: "2025-01-02",
  },
  // İhtiyaca göre daha fazla dummy veri ekleyin...
];

const ShipmentCreationHistoryPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const paginatedHistory = dummyHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          Kargo Oluşturma Geçmişi
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Takip Kodu</TableCell>
                <TableCell>Gönderen</TableCell>
                <TableCell>Alıcı</TableCell>
                <TableCell>Desi</TableCell>
                <TableCell>Ücret</TableCell>
                <TableCell>Oluşturulma Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedHistory.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.trackingCode}</TableCell>
                  <TableCell>{shipment.sender}</TableCell>
                  <TableCell>{shipment.receiver}</TableCell>
                  <TableCell>{shipment.desi}</TableCell>
                  <TableCell>{shipment.fee} ₺</TableCell>
                  <TableCell>{shipment.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={dummyHistory.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </Paper>
    </Box>
  );
};

export default ShipmentCreationHistoryPage;
