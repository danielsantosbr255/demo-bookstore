import Button from "../ui/Button";
import { BooksIcon, StarIcon, UsersIcon } from "../../libs/utils/icons";

export const BookstoreShowcase = () => {
  return (
    <div className="border-spin hidden xl:block rounded-t-3xl rounded-2xl h-10/12 shadow-lg">
      <aside className="bg-gradient-to-b from-white via-sky-100 to-white flex flex-col justify-between p-8 w-full h-full rounded-2xl">
        <div className="space-y-6">
          <h2 className="text-lg text-center font-serif font-semibold">Descubra novos mundos em cada página</h2>
        </div>

        <div className="flex flex-col items-center text-center mt-10 motion-preset-rebound-right">
          <img
            src="/images/showcase13.jpg"
            alt="Livro em destaque"
            className="w-40 h-56 object-cover shadow-md rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">A Livraria dos Sonhos</h3>
          <p className="text-sm text-gray-600">por Daniel Santos</p>

          <Button variant="outline" className="mt-4">
            Ver mais
          </Button>
        </div>

        {/* Bottom section — stats */}
        <div className="flex justify-around items-center text-gray-600 mt-10 pt-6 border-t border-stone-300">
          <div className="flex flex-col items-center">
            <BooksIcon className="w-6 h-6 mb-1" />
            <span className="font-semibold text-primary">3.200+</span>
            <span className="text-xs">Livros</span>
          </div>
          <div className="flex flex-col items-center">
            <UsersIcon className="w-6 h-6 mb-1" />
            <span className="font-semibold text-primary">1.000+</span>
            <span className="text-xs">Autores</span>
          </div>
          <div className="flex flex-col items-center">
            <StarIcon className="w-6 h-6 mb-1" />
            <span className="font-semibold text-primary">10k+</span>
            <span className="text-xs">Leitores</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
