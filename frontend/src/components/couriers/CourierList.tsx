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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Courier } from "../../store/courier/types";

const CourierList: React.FC = () => {
  const navigate = useNavigate();
  const { couriers, loading } = useSelector((state: RootState) => ({
    couriers: state.courier.couriers || [],
    loading: state.courier.loading,
  }));

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ad Soyad</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Bölge</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {couriers.map((courier: Courier) => (
            <TableRow key={courier.id}>
              <TableCell>{courier.fullName}</TableCell>
              <TableCell>{courier.phone}</TableCell>
              <TableCell>{courier.region}</TableCell>
              <TableCell>
                <Chip
                  label={courier.isActive ? "Aktif" : "Pasif"}
                  color={courier.isActive ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/couriers/${courier.id}`)}>
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

export default CourierList;
