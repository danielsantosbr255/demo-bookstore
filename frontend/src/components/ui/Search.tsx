import { GiArchiveResearch } from "react-icons/gi";

const Search = () => {
  return (
    <div className="flex border-2 border-dotted w-1/2 rounded-2xl px-4 items-center">
      <input type="text" placeholder="Pesquisar" className="w-full py-2 outline-none" />
      <GiArchiveResearch size={25} />
    </div>
  );
};

export default Search;
