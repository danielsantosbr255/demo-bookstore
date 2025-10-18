import { Link } from "react-router";
import { LogoIcon } from "../../libs/utils/icons";

function Logo({ size = 35 }: { size?: number }) {
  return (
    <Link to="/" className="flex items-center motion-preset-slide-up gap-2 hover:text-secondary hover:scale-105 transition-all">
      <LogoIcon size={size} />
      <strong className="lg:text-2xl font-bold tracking-widest text-gradient">Bookstore</strong>
    </Link>
  );
}

export default Logo;
