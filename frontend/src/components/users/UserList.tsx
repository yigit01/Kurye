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

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { users, loading } = useSelector((state: RootState) => ({
    users: state.auth.users || [],
    loading: state.auth.loading,
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
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip label={user.role} size="small" />
              </TableCell>
              <TableCell>
                <Chip
                  label={user.isActive ? "Aktif" : "Pasif"}
                  color={user.isActive ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/users/${user.id}`)}>
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

export default UserList;
