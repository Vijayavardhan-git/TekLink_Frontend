import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { FaUserFriends, FaSearch, FaCommentAlt, FaUserClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

// ... imports remain the same

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.user));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const filteredConnections = connections?.filter((connection) => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-400">Loading your connections...</p>
        </div>
      </div>
    );
  }

  if (!filteredConnections || filteredConnections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-base-300 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <FaUserFriends className="text-5xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">No Connections Found</h1>
          <p className="text-gray-400 mb-6">
            {searchTerm ? "No matches for your search" : "You haven't connected with anyone yet"}
          </p>
          {searchTerm ? (
            <button 
              onClick={() => setSearchTerm("")}
              className="btn btn-outline btn-sm gap-2"
            >
              <IoMdClose />
              Clear search
            </button>
          ) : (
            <Link to="/discover" className="btn btn-primary gap-2">
              <FaUserFriends />
              Discover Developers
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <span className="text-primary">Your</span>
              <span className="text-secondary">Connections</span>
              <FaUserFriends className="text-secondary" />
            </h1>
            {/* Subtitle Removed */}
          </div>

          {/* Search Bar */}
          <div className="mb-8 relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search connections..."
                className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence>
              {filteredConnections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                  <motion.div
                    key={_id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-base-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <img
                          alt={`${firstName} ${lastName}`}
                          src={photoUrl}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`;
                          }}
                        />
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-white">
                          {firstName} {lastName}
                        </h2>
                        {(age || gender) && (
                          <p className="text-sm text-gray-400">
                            {age && `${age} years`}
                            {age && gender && " • "}
                            {gender}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* About */}
                    {about && (
                      <p className="text-gray-300 mb-4 line-clamp-3 text-sm">
                        {about}
                      </p>
                    )}

                    {/* Only Chat Button */}
                    <div className="mt-auto">
                      <Link
                        to={`/chat/${_id}`}
                        className="btn btn-primary btn-sm w-full gap-2"
                      >
                        <FaCommentAlt />
                        Chat
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Connections;
