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
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Shipment } from "../../store/shipment/types";

const ShipmentList: React.FC = () => {
  const navigate = useNavigate();
  const { shipments, loading } = useSelector(
    (state: RootState) => state.shipment
  );

  if (loading) {
    return <div>Yükleniyor...</div>;
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
          {shipments.map((shipment: Shipment) => (
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
                  <Visibility />
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
