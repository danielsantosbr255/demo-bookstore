import SignInForm from "../components/auth/SignInForm";
import Showcase from "../components/auth/Showcase";
import { BookstoreShowcase } from "../components/auth/Showcase1";

const SignIn = () => {
  return (
    <main className="flex w-full h-dvh lg:grid grid-cols-2 xl:grid-cols-[2fr_5fr_auto] px-4 2xl:px-50 gap-4 items-center">
      <BookstoreShowcase />
      <Showcase />
      <SignInForm />
    </main>
  );
};

export default SignIn;
