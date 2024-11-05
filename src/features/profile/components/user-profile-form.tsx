import { useUser } from "@/app/providers/user-provider";
import staff1Url from "@/assets/dummy/1.png";
import { TextField } from "@/components/ui/form/text-field";
import type { User } from "@/models/users";
import type { DocRequestParams } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useGetUser } from "../api";
import { usePostUser } from "../api";
import { type ProfileSchema, profileSchema } from "../validation";

type Props = {
  user?: User;
} & DocRequestParams;

export const UserProfileForm = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();

  if (!user) {
    return null;
  }

  return <Component user={user} documentId={authorizedUser.uid} />;
};

const Component = ({ user, documentId }: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ProfileSchema>({
    defaultValues: user,
    resolver: zodResolver(profileSchema),
  });
  const { mutate, isPending } = usePostUser();

  const handleFormSubmit = (fieldValues: ProfileSchema) => {
    mutate(
      {
        documentId,
        user: fieldValues,
      },
      {
        onSuccess: () => {
          alert("Your profile has been updated");
        },
        onError: (error) => {
          alert("Failed to update profile");
          console.error(error);
        },
      },
    );
  };
  const handleReset = () => reset();

  return (
    <Card className="flex flex-col items-center p-6">
      <CardContent className="flex flex-col items-center gap-y-5">
        <Avatar
          alt="staff1"
          src={staff1Url}
          sx={{
            width: 120,
            height: 120,
          }}
          variant="rounded"
        />
        <Button variant="contained" size="medium" className="w-full">
          Upload New Photo
        </Button>
        <Typography className="text-[rgba(0,0,0,0.6)]">
          Allowed JPG, GIF or PNG. Max size of 800K
        </Typography>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-y-8 w-full"
          noValidate
        >
          <TextField
            required
            type="text"
            label="Display Name"
            fullWidth
            placeholder="John Doe"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <div className="flex gap-x-4">
            <Button variant="contained" type="submit" disabled={isPending}>
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={isPending}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
