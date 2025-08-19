// Profile.jsx
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { FaUserEdit } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FaUserEdit className="text-2xl text-primary" />
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Edit</span> Profile
            </h1>
          </div>
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;