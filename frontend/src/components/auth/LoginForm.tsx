import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email adresi zorunludur"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalıdır"),
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // TODO: Implement login logic
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Adresi"
        autoComplete="email"
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Şifre"
        type="password"
        id="password"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Giriş Yap
      </Button>
    </Box>
  );
};

export default LoginForm;
