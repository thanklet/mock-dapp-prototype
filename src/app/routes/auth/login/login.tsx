import { Head } from "@/components/seo/head";
import { Link } from "@/components/ui/link";
import { LoginForm } from "@/features/auth/components/login-form";

export const LoginRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="Login" />
      <LoginForm />
      <div className="text-center">
        <span className="mr-1">New on our platform?</span>
        <Link to="/auth/sign-up">Create an account</Link>
      </div>
    </div>
  );
};
