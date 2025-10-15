import SignInForm from "../components/auth/SignInForm";
import Showcase from "../components/auth/Showcase";
import { BookstoreShowcase } from "../components/auth/Showcase1";

const SignIn = () => {
  return (
    <main className="lg:grid grid-cols-2 xl:grid-cols-[2fr_5fr_auto] h-dvh w-full px-4 2xl:px-50 gap-4 items-center">
      <div className="hidden xl:block bg-sky-100/50 w-full h-10/12 rounded-3xl shadow-lg">
        <BookstoreShowcase />
      </div>
      <Showcase />
      <SignInForm />
    </main>
  );
};

export default SignIn;
