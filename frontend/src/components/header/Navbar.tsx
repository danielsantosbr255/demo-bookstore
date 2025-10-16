import { Link } from "react-router";
import Logo from "../ui/Logo";
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegHeart, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import type { JSX } from "react";

const NavItem = ({ label, icon, href }: { label: string; icon: JSX.Element; href: string }) => {
  return (
    <Link to={href} className="flex flex-col items-center hover:text-secondary hover:scale-105 transition-all">
      {icon} {label}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="text-primary w-full flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <div className="flex gap-6 items-center text-xs font-semibold">
        <NavItem label="Notificacões" icon={<FaRegHeart size={25} />} href="#" />
        <NavItem label="Carrinho" icon={<FaShoppingBag size={25} />} href="#" />
        <NavItem label="Entrar" icon={<AiOutlineLogin size={25} />} href="/sign-in" />
        <NavItem label="Perfil" icon={<FaUserCircle size={25} />} href="/profile" />
      </div>
    </nav>
  );
};

export default Navbar;
