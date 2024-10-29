import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { PasswordField } from "@/components/ui/form/password-field";
import { TextField } from "@/components/ui/form/text-field";
import { getUserCredential } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlLabel } from "@mui/material";
import type { UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../api";
import { type LoginSchema, loginSchema } from "../validation";

export const LoginForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null,
  );
  const { data: user, isLoading } = useGetUser(
    userCredential ? { documentId: userCredential.user.uid } : null,
  );

  const handleFormSubmit = async (fieldValues: LoginSchema) => {
    try {
      const credential = await getUserCredential(fieldValues);
      setUserCredential(credential);
      if (!credential) {
        alert("Invalid email or password");

        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.exists()) {
      navigate(`/app/${user.id}/dashboard`);
    }
  }, [user, navigate]);

  return (
    <form
      className="flex flex-col gap-y-3 max-w-[375px] w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextField
        required
        type="email"
        label="Email"
        placeholder="admin@demo.com"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        required
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
      />

      <FormControlLabel control={<Checkbox />} label="Remember Me" />

      <Button type="submit" variant="contained" disabled={isLoading}>
        Sign in
      </Button>
    </form>
  );
};
