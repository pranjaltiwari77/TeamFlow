import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  getUsers,
  changeUserStatus,
  changeUserRole,
} from "../services/user.service";
import { toast } from "sonner";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      // Agar backend response { success, data } deta hai
      setUsers(response.data || []);

      // Agar direct array aati ho to ye use karo:
      // setUsers(response);

    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    try {
      await changeUserStatus(id);
  
      loadUsers();
  
    } catch (error) {
      console.log(error);
    }
  };
  const handleRole = async (id, role) => {
    try {
      await changeUserRole(id, role);

      toast.success("User role updated");

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Team Members
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6"
                >
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t"
                >
                  <td className="p-3">
                    {user.name}
                  </td>

                  <td className="p-3">
                    {user.email}
                  </td>

                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRole(
                          user._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <option value="admin">
                        Admin
                      </option>

                      <option value="member">
                        Member
                      </option>
                    </select>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        handleStatus(user)
                      }
                      className={`px-4 py-2 rounded text-white ${
                        user.isActive
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {user.isActive
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}

export default Users;