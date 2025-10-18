import Logo from "../ui/Logo";
import type { JSX } from "react";
import Search from "../ui/Search";
import { Link } from "react-router";
import { CartIcon, NotificationsIcon, ProfileIcon, SignInIcon } from "../../libs/utils/icons";

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
        <NavItem label="Notificacões" icon={<NotificationsIcon size={25} />} href="#" />
        <NavItem label="Carrinho" icon={<CartIcon size={25} />} href="#" />
        {user ? (
          <NavItem label="Perfil" icon={<ProfileIcon size={25} />} href="/profile" />
        ) : (
          <NavItem label="Entrar" icon={<SignInIcon size={25} />} href="/sign-in" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
