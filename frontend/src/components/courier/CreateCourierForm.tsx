import React from "react";
import { useForm } from "react-hook-form";

interface CreateCourierFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  branchId: string;
  identificationNumber: string;
}

interface Branch {
  id: string;
  name: string;
}

interface CreateCourierFormProps {
  onSubmit: (data: CreateCourierFormData) => void;
  branches: Branch[];
}

const CreateCourierForm: React.FC<CreateCourierFormProps> = ({
  onSubmit,
  branches,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourierFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Ad Soyad
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "Ad soyad gerekli",
            minLength: { value: 2, message: "En az 2 karakter olmalı" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-posta
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "E-posta gerekli",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Geçerli bir e-posta adresi giriniz",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Şifre
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Şifre gerekli",
            minLength: { value: 6, message: "En az 6 karakter olmalı" },
            pattern: {
              value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
              message:
                "Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam veya özel karakter içermelidir",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
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
            minLength: { value: 10, message: "En az 10 karakter olmalı" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="branchId"
          className="block text-sm font-medium text-gray-700"
        >
          Şube
        </label>
        <select
          id="branchId"
          {...register("branchId", { required: "Şube seçimi gerekli" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Seçiniz</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        {errors.branchId && (
          <p className="mt-1 text-sm text-red-600">{errors.branchId.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="identificationNumber"
          className="block text-sm font-medium text-gray-700"
        >
          TC Kimlik No
        </label>
        <input
          type="text"
          id="identificationNumber"
          {...register("identificationNumber", {
            required: "TC Kimlik No gerekli",
            minLength: { value: 10, message: "En az 10 karakter olmalı" },
            pattern: {
              value: /^[0-9]+$/,
              message: "Geçerli bir TC Kimlik No giriniz",
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.identificationNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.identificationNumber.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Kurye Oluştur
        </button>
      </div>
    </form>
  );
};

export default CreateCourierForm;
