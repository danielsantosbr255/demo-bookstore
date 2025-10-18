import {
  GiArchiveResearch,
  GiBookCover,
  GiSpellBook,
  GiUfo,
  GiLovers,
  GiCastle,
  GiCavalry,
  GiBrokenHeartZone,
  GiCowled,
} from "react-icons/gi";
import { AiOutlineLogin } from "react-icons/ai";
import { FaBookReader, FaRegHeart, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { LuCloudUpload, LuHistory, LuUserSearch } from "react-icons/lu";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { LuBookOpen, LuUsers, LuStar } from "react-icons/lu";

type IconProps = {
  size?: number;
  className?: string;
};

export const LogoIcon = (props: IconProps) => <FaBookReader {...props} />;
export const CartIcon = (props: IconProps) => <FaShoppingBag {...props} />;
export const ProfileIcon = (props: IconProps) => <FaUserCircle {...props} />;
export const SearchIcon = (props: IconProps) => <GiArchiveResearch {...props} />;
export const NotificationsIcon = (props: IconProps) => <FaRegHeart {...props} />;

export const SignInIcon = (props: IconProps) => <AiOutlineLogin {...props} />;
export const SignUpIcon = (props: IconProps) => <PiUserCirclePlusFill {...props} />;

export const HomeBannerIcon = (props: IconProps) => <GiSpellBook {...props} />;
export const ExploreBookIcon = (props: IconProps) => <GiBookCover {...props} />;

export const ExploreRegIcon = (props: IconProps) => <LuUserSearch {...props} />;
export const HistoryIcon = (props: IconProps) => <LuHistory {...props} />;
export const CloudIcon = (props: IconProps) => <LuCloudUpload {...props} />;
export const StarIcon = (props: IconProps) => <LuStar {...props} />;

export const BooksIcon = (props: IconProps) => <LuBookOpen {...props} />;
export const UsersIcon = (props: IconProps) => <LuUsers {...props} />;

// categories
export const FantasyIcon = (props: IconProps) => <GiCastle {...props} />;
export const RomanceIcon = (props: IconProps) => <GiLovers {...props} />;
export const HorrorIcon = (props: IconProps) => <GiBrokenHeartZone {...props} />;
export const MysteryIcon = (props: IconProps) => <GiCavalry {...props} />;
export const FictionIcon = (props: IconProps) => <GiUfo {...props} />;
export const PoetryIcon = (props: IconProps) => <GiCowled {...props} />;
export const AdventureIcon = (props: IconProps) => <GiCavalry {...props} />;
export const DramaIcon = (props: IconProps) => <GiBrokenHeartZone {...props} />;
export const SuspenseIcon = (props: IconProps) => <GiCowled {...props} />;
