import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TablePagination,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Branch, PaginatedBranches } from "../../store/branch/types";
import { fetchBranches } from "../../store/branch/branchSlice";
import { AppDispatch } from "../../store";

interface PaginatedResponse {
  data: Branch[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

const BranchList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { branches, loading } = useSelector((state: RootState) => ({
    branches: (state.branch.branches as PaginatedResponse) || {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
    loading: state.branch.loading,
  }));

  useEffect(() => {
    dispatch(fetchBranches({ page: page + 1, limit: rowsPerPage }));
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
              <TableCell>Şube Adı</TableCell>
              <TableCell>Adres</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.data.map((branch: Branch) => (
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
                  <IconButton
                    onClick={() => navigate(`/branches/${branch.id}`)}
                  >
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
        count={branches.meta.totalItems}
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

export default BranchList;
