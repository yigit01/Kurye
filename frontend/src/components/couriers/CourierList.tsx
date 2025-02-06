//frontend\src\components\couriers\CourierList.tsx
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
  Chip,
  TablePagination,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Courier } from "../../store/courier/types";
import { fetchCouriers } from "../../store/courier/courierSlice";
import { AppDispatch } from "../../store";

interface PaginatedResponse {
  data: Courier[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

const CourierList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { couriers, loading } = useSelector((state: RootState) => ({
    couriers: (state.courier.couriers as PaginatedResponse) || {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
    loading: state.courier.loading,
  }));

  useEffect(() => {
    dispatch(fetchCouriers({ page: page + 1, limit: rowsPerPage }));
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
              <TableCell>Telefon</TableCell>
              <TableCell>Bölge</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {couriers.data.map((courier: Courier) => (
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
                  <IconButton
                    onClick={() => navigate(`/couriers/${courier.id}`)}
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
        count={couriers.meta.totalItems}
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

export default CourierList;
