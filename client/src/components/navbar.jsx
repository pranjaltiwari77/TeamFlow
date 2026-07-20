import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authslice"; // Check filename: authSlice.js
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/log-in"); // Agar tumhara route "/login" hai to "/login" kar dena
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;