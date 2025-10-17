import { FaUserCircle } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router";
import type { JSX } from "react";

const NavItem = ({ label, icon, href }: { label: string; icon: JSX.Element; href: string }) => {
  return (
    <Link to={href} className="flex flex-col items-center hover:text-secondary scale-100 hover:scale-105 transition-all">
      {icon} {label}
    </Link>
  );
};

const MobileHeader = () => {
  const user = false;

  return (
    <nav className="lg:hidden flex w-full justify-between items-center">
      <div>
        <Logo size={24} />
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <Search />
      </div>

      <div className="flex gap-6 items-center text-xs font-semibold">
        {user ? (
          <NavItem label="Perfil" icon={<FaUserCircle size={25} />} href="/profile" />
        ) : (
          <NavItem label="Entrar" icon={<AiOutlineLogin size={25} />} href="/sign-in" />
        )}
      </div>
    </nav>
  );
};

export default MobileHeader;
