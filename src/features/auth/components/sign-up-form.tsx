import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { PasswordField } from "@/components/ui/form/password-field";
import { TextField } from "@/components/ui/form/text-field";
import { Link } from "@/components/ui/link";
import { isFirebaseAuthError } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlLabel } from "@mui/material";
import { AuthErrorCodes } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostUser } from "../api";
import { type SignUpSchema, signUpSchema } from "../validation";

export const SignUpForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<SignUpSchema>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      termsAndConditions: false,
    },
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const { isPending, mutateAsync } = usePostUser();

  const handleFormSubmit = async (fieldValues: SignUpSchema) => {
    try {
      await mutateAsync(fieldValues, {
        onSuccess: () => {
          navigate("/auth/login");
        },
        onError: (error) => {
          if (isFirebaseAuthError(error)) {
            if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
              alert("Invalid email");
            }
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-3 max-w-[375px] w-full"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <TextField
        required
        type="text"
        label="Username"
        placeholder="Johndoe"
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register("username")}
      />
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

      <FormControlLabel
        control={<Checkbox required {...register("termsAndConditions")} />}
        label={
          <span>
            I agree to <Link to={"#"}>privacy policy & terms</Link>
          </span>
        }
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!watch("termsAndConditions") || isPending}
      >
        Sign Up
      </Button>
    </form>
  );
};
