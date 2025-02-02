import React from "react";
import { useForm } from "react-hook-form";

interface CreateBranchFormData {
  name: string;
  address: string;
  phone: string;
  location?: string;
}

interface CreateBranchFormProps {
  onSubmit: (data: CreateBranchFormData) => void;
}

const CreateBranchForm: React.FC<CreateBranchFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBranchFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Şube Adı
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Şube adı gerekli" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Adres
        </label>
        <textarea
          id="address"
          {...register("address", { required: "Adres gerekli" })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Telefon
        </label>
        <input
          type="text"
          id="phone"
          {...register("phone", {
            required: "Telefon gerekli",
            pattern: {
              value: /^[0-9]+$/,
              message: "Geçerli bir telefon numarası giriniz",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Konum (Opsiyonel)
        </label>
        <input
          type="text"
          id="location"
          {...register("location")}
          placeholder="Enlem, Boylam (örn: 41.0082,28.9784)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Şube Oluştur
        </button>
      </div>
    </form>
  );
};

export default CreateBranchForm;
