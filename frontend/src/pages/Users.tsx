import type { UserResponse } from "../@types/user.types";
import { usersService } from "../libs/services/users.service";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const { data, isPending } = useQuery<UserResponse>({
    queryKey: ["users"],
    queryFn: usersService.getAll,
  });

  if (isPending) return <span>Loading...</span>;
  if (!data) return <span>Error</span>;

  const users = data.data;

  return (
    <main className="flex flex-col pt-20 max-w-10/12 justify-center items-center mx-auto mt-10 p-5 rounded-md">
      <section className="bg-white px-15 py-10 gap-10 shadow rounded-2xl text-primary container text-xl flex flex-col">
        <h1 className="text-4xl text-center font-bold">Lista de Amigos</h1>

        <ul className="list-disc">
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Users;
