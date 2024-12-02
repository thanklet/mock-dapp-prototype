import { Head } from "@/components/seo/head";
import { Link } from "@/components/ui/link";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const SignUpRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="Sign Up" />
      <SignUpForm />
      <div className="text-center">
        <span className="mr-1">Already have an account?</span>
        <Link to="/auth/login">Sing in instead</Link>
      </div>
    </div>
  );
};
