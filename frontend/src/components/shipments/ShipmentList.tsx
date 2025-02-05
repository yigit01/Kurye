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
  Box,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Shipment } from "../../store/shipment/types";
import { fetchShipments } from "../../store/shipment/shipmentSlice";
import { AppDispatch } from "../../store";

interface PaginatedResponse {
  data: Shipment[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

const ShipmentList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const { shipments, loading } = useSelector((state: RootState) => ({
    shipments: (state.shipment.shipments as PaginatedResponse) || {
      data: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 20,
        totalPages: 1,
        currentPage: 1,
      },
    },
    loading: state.shipment.loading,
  }));

  useEffect(() => {
    dispatch(fetchShipments({ page: page + 1, limit: rowsPerPage }));
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
              <TableCell>Takip Kodu</TableCell>
              <TableCell>Alıcı</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Ödeme Tipi</TableCell>
              <TableCell>Tutar</TableCell>
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
                <TableCell>{shipment.paymentType}</TableCell>
                <TableCell>{shipment.amount}</TableCell>
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
      <TablePagination
        component="div"
        count={shipments.meta.totalItems}
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

export default ShipmentList;
