import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
  FaUser,
  FaUsers,
  FaUserPlus,
  FaCrown,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-100 px-4 md:px-8 py-3 shadow-sm border-b border-base-300 sticky top-0 z-50">
      {/* Left Section - Brand Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost p-0 hover:bg-transparent active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full opacity-70"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">Tek</span>
              <span className="text-secondary">Lync</span>
            </h1>
          </div>
        </Link>
      </div>

      {/* Right Section - User Controls */}
      {user && (
        <div className="flex-none flex items-center gap-3 md:gap-4">
          {/* Notifications */}
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <IoMdNotificationsOutline className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="btn btn-ghost btn-circle btn-sm relative">
            <RiMessage2Line className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* Greeting */}
          {/* <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-medium text-base-content">
              Welcome back,
            </span>
            <span className="text-sm font-semibold text-primary">
              {user.firstName}
            </span>
          </div> */}

          {/* Greeting */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-base-content ">
            <span className="text-gray-500">Welcome back,</span>
            <span className="font-semibold text-primary">{user.firstName}</span>
          </div>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all duration-200"
            >
              <div className="w-10 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                <img
                  alt={user.firstName}
                  src={user.photoUrl}
                  className="rounded-full border-2 border-base-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://avatar.vercel.sh/" + user.firstName;
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
            >
              <li>
                <Link to="/profile" className="hover:bg-base-200">
                  <FaUser className="text-primary" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-base-200">
                  <FaUsers className="text-primary" />
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-base-200">
                  <FaUserPlus className="text-primary" />
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="hover:bg-base-200">
                  <FaCrown className="text-yellow-500" />
                  Premium
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-error hover:bg-error hover:text-white"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
