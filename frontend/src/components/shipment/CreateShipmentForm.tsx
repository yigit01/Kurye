//frontend\src\components\shipment\CreateShipmentForm.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { PaymentType } from "../../types/shipment";
import { RootState } from "../../store";
import { fetchCouriers } from "../../store/courier/courierSlice";
import { fetchBranches } from "../../store/slices/branchSlice";
import CreateCourierModal from "../couriers/CreateCourierModal";
import CreateBranchModal from "../branches/CreateBranchModal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CreateShipmentFormData {
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  paymentType: PaymentType;
  amount: number;
  courierId?: string;
  branchId?: string;
  dimensions?: {
    weight: number;
    width: number;
    height: number;
    length: number;
  };
}

interface CreateShipmentFormProps {
  onSubmit: (data: CreateShipmentFormData) => void;
}

const CreateShipmentForm: React.FC<CreateShipmentFormProps> = ({
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const [isCreateCourierOpen, setIsCreateCourierOpen] = useState(false);
  const [isCreateBranchOpen, setIsCreateBranchOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateShipmentFormData>();

  const selectedBranchId = watch("branchId");

  const couriers = useSelector((state: RootState) =>
    (state.courier.couriers?.data || []).filter(
      (courier) => !selectedBranchId || courier.branchId === selectedBranchId
    )
  );
  const branches = useSelector((state: RootState) => state.branch.branches);

  useEffect(() => {
    dispatch(fetchCouriers({ page: 1, limit: 100 }) as any);
    dispatch(fetchBranches() as any);
  }, [dispatch]);

  useEffect(() => {
    // Reset courier selection when branch changes
    setValue("courierId", "");
  }, [selectedBranchId, setValue]);

  const handleCreateCourierSuccess = () => {
    dispatch(fetchCouriers({ page: 1, limit: 100 }) as any);
  };

  const handleCreateBranchSuccess = () => {
    dispatch(fetchBranches() as any);
  };

  // Branch Selection
  const handleBranchChange = (event: any) => {
    setValue("branchId", event.target.value);
  };

  // Courier Selection
  const handleCourierChange = (event: any) => {
    setValue("courierId", event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="recipientName"
            className="block text-sm font-medium text-gray-700"
          >
            Alıcı Adı
          </label>
          <input
            type="text"
            id="recipientName"
            {...register("recipientName", { required: "Alıcı adı gerekli" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.recipientName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="recipientPhone"
            className="block text-sm font-medium text-gray-700"
          >
            Alıcı Telefon
          </label>
          <input
            type="text"
            id="recipientPhone"
            {...register("recipientPhone", {
              required: "Alıcı telefonu gerekli",
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.recipientPhone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.recipientPhone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="recipientAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Alıcı Adresi
          </label>
          <textarea
            id="recipientAddress"
            {...register("recipientAddress", {
              required: "Alıcı adresi gerekli",
            })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.recipientAddress && (
            <p className="mt-1 text-sm text-red-600">
              {errors.recipientAddress.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="paymentType"
            className="block text-sm font-medium text-gray-700"
          >
            Ödeme Tipi
          </label>
          <select
            id="paymentType"
            {...register("paymentType", { required: "Ödeme tipi gerekli" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Seçiniz</option>
            <option value={PaymentType.CASH}>Nakit</option>
            <option value={PaymentType.CREDIT_CARD}>Kredi Kartı</option>
            <option value={PaymentType.BANK_TRANSFER}>Banka Transferi</option>
          </select>
          {errors.paymentType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.paymentType.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Tutar
          </label>
          <input
            type="number"
            id="amount"
            {...register("amount", { required: "Tutar gerekli", min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Kargo Boyutları (Opsiyonel)
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Ağırlık (kg)
              </label>
              <input
                type="number"
                id="weight"
                {...register("dimensions.weight", { min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="width"
                className="block text-sm font-medium text-gray-700"
              >
                Genişlik (cm)
              </label>
              <input
                type="number"
                id="width"
                {...register("dimensions.width", { min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700"
              >
                Yükseklik (cm)
              </label>
              <input
                type="number"
                id="height"
                {...register("dimensions.height", { min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="length"
                className="block text-sm font-medium text-gray-700"
              >
                Uzunluk (cm)
              </label>
              <input
                type="number"
                id="length"
                {...register("dimensions.length", { min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Branch Selection */}
        <div className="flex items-center gap-2">
          <FormControl fullWidth error={!!errors.branchId}>
            <InputLabel id="branch-label">Şube</InputLabel>
            <Select
              labelId="branch-label"
              value={watch("branchId") || ""}
              onChange={handleBranchChange}
              label="Şube"
            >
              {branches?.data?.map((branch) => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
            {errors.branchId && (
              <FormHelperText>{errors.branchId.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateBranchOpen(true)}
          >
            Yeni
          </Button>
        </div>

        {/* Courier Selection */}
        <div className="flex items-center gap-2">
          <FormControl fullWidth error={!!errors.courierId}>
            <InputLabel id="courier-label">Kurye</InputLabel>
            <Select
              labelId="courier-label"
              value={watch("courierId") || ""}
              onChange={handleCourierChange}
              label="Kurye"
              disabled={!selectedBranchId}
            >
              <MenuItem value="">Seçiniz</MenuItem>
              {couriers?.map((courier) => (
                <MenuItem key={courier.id} value={courier.id}>
                  {courier.fullName}
                </MenuItem>
              ))}
            </Select>
            {errors.courierId && (
              <FormHelperText>{errors.courierId.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateCourierOpen(true)}
            disabled={!selectedBranchId}
          >
            Yeni
          </Button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kargo Oluştur
          </button>
        </div>
      </form>

      <CreateCourierModal
        open={isCreateCourierOpen}
        onClose={() => setIsCreateCourierOpen(false)}
        onSuccess={handleCreateCourierSuccess}
        branchId={selectedBranchId}
      />

      <CreateBranchModal
        open={isCreateBranchOpen}
        onClose={() => setIsCreateBranchOpen(false)}
        onSuccess={handleCreateBranchSuccess}
      />
    </>
  );
};

export default CreateShipmentForm;
