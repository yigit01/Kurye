import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

interface CourierDeliveriesProps {
  id: string;
}

const CourierDeliveries: React.FC<CourierDeliveriesProps> = ({ id }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Teslimatlar
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Takip Kodu</TableCell>
              <TableCell>Alıcı</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Tarih</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>TR123456789</TableCell>
              <TableCell>Ahmet Yılmaz</TableCell>
              <TableCell>
                <Chip label="Teslim Edildi" color="success" size="small" />
              </TableCell>
              <TableCell>12.03.2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CourierDeliveries;
