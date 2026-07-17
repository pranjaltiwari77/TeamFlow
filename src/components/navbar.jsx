import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div>

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>

      </div>

    </header>
  );
}

export default Navbar;