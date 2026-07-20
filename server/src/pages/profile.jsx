import { useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import {
  updateProfile,
  changePassword,
} from "../services/auth.service";
import { toast } from "sonner";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdate = async () => {
    try {
  
      const formData = new FormData();
  
      formData.append("name", form.name);
      formData.append("email", form.email);
  
      if (image) {
        formData.append("profileImage", image);
      }
  
      await updateProfile(formData);
  
      toast.success("Profile Updated");
  
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handlePassword = async () => {
    try {
      await changePassword(passwords);

      toast.success("Password Changed Successfully");

      setPasswords({
        currentPassword: "",
        newPassword: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Password Change Failed");
    }
  };

  return (
    <MainLayout>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="space-y-5">
        <div className="flex flex-col items-center mb-6">

<img
  src={
    image
      ? URL.createObjectURL(image)
      : user?.profileImage ||
        "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
  }
  alt="Profile"
  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
/>

<input
  type="file"
  className="mt-4"
  onChange={(e) =>
    setImage(e.target.files[0])
  }
/>

</div>
          <div>
            <label className="font-semibold">
              Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Role
            </label>

            <input
              value={user?.role}
              disabled
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Update Profile
          </button>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                currentPassword: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handlePassword}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Change Password
          </button>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;