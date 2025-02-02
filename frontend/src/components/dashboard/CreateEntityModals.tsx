import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/Modal";
import CreateShipmentForm from "../shipment/CreateShipmentForm";
import CreateBranchForm from "../branch/CreateBranchForm";
import CreateCourierForm from "../courier/CreateCourierForm";
import { RootState, AppDispatch } from "../../store";
import { PlusIcon } from "@heroicons/react/24/outline";
import { createShipment } from "../../store/shipment/shipmentSlice";
import { createBranch, fetchBranches } from "../../store/branch/branchSlice";
import { createCourier } from "../../store/courier/courierSlice";
import { toast } from "react-toastify";

interface CreateEntityModalsProps {
  userRole: string;
}

const CreateEntityModals: React.FC<CreateEntityModalsProps> = ({
  userRole,
}) => {
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isCourierModalOpen, setIsCourierModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const branches = useSelector((state: RootState) => state.branch.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleCreateShipment = async (data: any) => {
    try {
      await dispatch(createShipment(data)).unwrap();
      setIsShipmentModalOpen(false);
      toast.success("Kargo başarıyla oluşturuldu");
    } catch (error) {
      toast.error("Kargo oluşturulurken bir hata oluştu");
      console.error("Error creating shipment:", error);
    }
  };

  const handleCreateBranch = async (data: any) => {
    try {
      await dispatch(createBranch(data)).unwrap();
      setIsBranchModalOpen(false);
      toast.success("Şube başarıyla oluşturuldu");
    } catch (error) {
      toast.error("Şube oluşturulurken bir hata oluştu");
      console.error("Error creating branch:", error);
    }
  };

  const handleCreateCourier = async (data: any) => {
    try {
      await dispatch(createCourier(data)).unwrap();
      setIsCourierModalOpen(false);
      toast.success("Kurye başarıyla oluşturuldu");
    } catch (error) {
      toast.error("Kurye oluşturulurken bir hata oluştu");
      console.error("Error creating courier:", error);
    }
  };

  return (
    <>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsShipmentModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Yeni Kargo
        </button>

        {(userRole === "admin" || userRole === "branch_operator") && (
          <>
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Yeni Şube
            </button>

            <button
              onClick={() => setIsCourierModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Yeni Kurye
            </button>
          </>
        )}
      </div>

      <Modal
        isOpen={isShipmentModalOpen}
        onClose={() => setIsShipmentModalOpen(false)}
        title="Yeni Kargo Oluştur"
      >
        <CreateShipmentForm onSubmit={handleCreateShipment} />
      </Modal>

      <Modal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        title="Yeni Şube Oluştur"
      >
        <CreateBranchForm onSubmit={handleCreateBranch} />
      </Modal>

      <Modal
        isOpen={isCourierModalOpen}
        onClose={() => setIsCourierModalOpen(false)}
        title="Yeni Kurye Oluştur"
      >
        <CreateCourierForm onSubmit={handleCreateCourier} branches={branches} />
      </Modal>
    </>
  );
};

export default CreateEntityModals;
