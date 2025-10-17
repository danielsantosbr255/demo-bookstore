import { Link } from "react-router";
import Logo from "../ui/Logo";
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegHeart, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import type { JSX } from "react";
import Search from "../ui/Search";

const NavItem = ({ label, icon, href }: { label: string; icon: JSX.Element; href: string }) => {
  return (
    <Link to={href} className="flex flex-col items-center hover:text-secondary scale-100 hover:scale-105 transition-all">
      {icon} {label}
    </Link>
  );
};

const Navbar = () => {
  const user = false;

  return (
    <nav className="hidden lg:flex w-full justify-between items-center">
      <div>
        <Logo />
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <Search />
      </div>

      <div className="flex gap-6 items-center text-xs font-semibold">
        <NavItem label="Notificacões" icon={<FaRegHeart size={25} />} href="#" />
        <NavItem label="Carrinho" icon={<FaShoppingBag size={25} />} href="#" />
        {user ? (
          <NavItem label="Perfil" icon={<FaUserCircle size={25} />} href="/profile" />
        ) : (
          <NavItem label="Entrar" icon={<AiOutlineLogin size={25} />} href="/sign-in" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
