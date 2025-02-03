import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Shipment } from "../../store/shipment/types";
import { ShipmentState } from "../../store/slices/shipmentSlice";

const ShipmentList: React.FC = () => {
  const navigate = useNavigate();
  const { shipments, loading } = useSelector(
    (state: RootState) => state.shipment
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!shipments?.data || shipments.data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography>Henüz kargo bulunmamaktadır.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Takip Kodu</TableCell>
            <TableCell>Alıcı</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments.data.map((shipment: Shipment) => (
            <TableRow key={shipment.id}>
              <TableCell>{shipment.trackingCode}</TableCell>
              <TableCell>{shipment.recipientName}</TableCell>
              <TableCell>
                <Chip label={shipment.status} color="primary" size="small" />
              </TableCell>
              <TableCell>
                {new Date(shipment.createdAt).toLocaleDateString("tr-TR")}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => navigate(`/shipments/${shipment.id}`)}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentList;
