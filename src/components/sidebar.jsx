import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">

<div className="flex items-center gap-3">
<img
  src="/vite.svg"
  alt="Vite"
  className="w-10 h-10 border border-red-500"
/>

<h1 className="text-2xl font-bold text-white">
    TeamFlow
  </h1>
</div>

      <nav className="mt-6 flex flex-col">

        <Link
          to="/dashboard"
          className="px-6 py-3 hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="px-6 py-3 hover:bg-slate-700"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="px-6 py-3 hover:bg-slate-700"
        >
          Tasks
        </Link>

        <Link
          to="/users"
          className="px-6 py-3 hover:bg-slate-700"
        >
          Users
        </Link>

        <Link
          to="/profile"
          className="px-6 py-3 hover:bg-slate-700"
        >
          Profile
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;