import { Link } from "react-router";
import Logo from "../ui/Logo";

const Navbar = () => {
  return (
    <nav className="text-primary w-full flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <div className="flex gap-4 items-center text-lg font-semibold">
        <Link to="/sign-in">SignIn</Link>
        <Link to="/users">Perfil</Link>
      </div>
    </nav>
  );
};

export default Navbar;
