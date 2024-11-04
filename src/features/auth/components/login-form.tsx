import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { PasswordField } from "@/components/ui/form/password-field";
import { TextField } from "@/components/ui/form/text-field";
import { getUserCredential } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlLabel } from "@mui/material";
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
  const { mutate, isPending } = useGetUser();

  const handleFormSubmit = async (fieldValues: LoginSchema) => {
    try {
      const credential = await getUserCredential(fieldValues);
      if (!credential) {
        alert("Invalid email or password");

        return;
      }

      mutate(
        { documentId: credential.user.uid },
        {
          onSuccess: (user) => {
            if (user.exists()) {
              navigate(`/app/${user.id}/dashboard`);
            } else {
              alert("No found user");
            }
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-3 max-w-[375px] w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
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

      <Button type="submit" variant="contained" disabled={isPending}>
        Sign in
      </Button>
    </form>
  );
};
