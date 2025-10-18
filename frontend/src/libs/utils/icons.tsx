import { GiSpellBook } from "react-icons/gi";
import { AiOutlineLogin } from "react-icons/ai";
import { FaRegHeart, FaShoppingBag, FaUserCircle } from "react-icons/fa";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size: number;
};

export const CartIcon = ({ size, ...props }: IconProps) => <FaShoppingBag size={size} {...props} />;
export const HomeIcon = ({ size, ...props }: IconProps) => <GiSpellBook size={size} {...props} />;
export const SignInIcon = ({ size, ...props }: IconProps) => <AiOutlineLogin size={size} {...props} />;
export const ProfileIcon = ({ size, ...props }: IconProps) => <FaUserCircle size={size} {...props} />;
export const NotificationsIcon = ({ size, ...props }: IconProps) => <FaRegHeart size={size} {...props} />;
// GiEntryDoor
