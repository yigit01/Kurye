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
import { RootState } from "../../store";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

const BranchList: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading } = useSelector((state: RootState) => state.branch);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Şube Adı</TableCell>
            <TableCell>Adres</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((branch: Branch) => (
            <TableRow key={branch.id}>
              <TableCell>{branch.name}</TableCell>
              <TableCell>{branch.address}</TableCell>
              <TableCell>{branch.phone}</TableCell>
              <TableCell>
                <Chip
                  label={branch.isActive ? "Aktif" : "Pasif"}
                  color={branch.isActive ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/branches/${branch.id}`)}>
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

export default BranchList;
