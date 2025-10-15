import { FaBookReader } from "react-icons/fa";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary hover:scale-105 transition-all">
      <FaBookReader size={40} />
      <strong className="text-2xl font-bold tracking-widest text-gradient">Bookstore</strong>
    </Link>
  );
}

export default Logo;
