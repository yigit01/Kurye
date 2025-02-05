import React, { useState, useEffect } from "react";
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
  Box,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { fetchUsers } from "../../store/auth/authSlice";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { users, loading } = useSelector((state: RootState) => ({
    users: state.auth.users || {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
    loading: state.auth.loading,
  }));

  useEffect(() => {
    dispatch(fetchUsers({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <Box>
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
            {users.data.map((user: User) => (
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
      <TablePagination
        component="div"
        count={users.meta.totalItems}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
        labelDisplayedRows={({ from, to, count, page }) =>
          `Sayfa ${page + 1} (${from}-${to} / Toplam ${count} kayıt)`
        }
        labelRowsPerPage="Sayfa başına kayıt"
        showFirstButton
        showLastButton
        getItemAriaLabel={(type) => {
          if (type === "first") return "İlk sayfaya git";
          if (type === "last") return "Son sayfaya git";
          if (type === "next") return "Sonraki sayfa";
          if (type === "previous") return "Önceki sayfa";
          return "";
        }}
      />
    </Box>
  );
};

export default UserList;
