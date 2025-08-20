import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { FaUserPlus, FaCheck, FaTimes, FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Track which button is being processed
  const [processing, setProcessing] = useState({ id: null, action: null });

  const reviewRequest = async (action, _id) => {
    try {
      setProcessing({ id: _id, action });
      await axios.post(`${BASE_URL}/request/review/${action}/${_id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Failed to review request:", err);
    } finally {
      setProcessing({ id: null, action: null });
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/user/requests/pending`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-400">Loading connection requests...</p>
        </div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="bg-base-300 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <FaBell className="text-5xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">No Pending Requests</h1>
          <p className="text-gray-400 mb-6">
            You don't have any connection requests at the moment
          </p>
          <Link to="/" className="btn btn-primary gap-2">
            <FaUserPlus />
            Discover Developers
          </Link>
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
              <span className="text-primary">Connection</span>
              <span className="text-secondary">Requests</span>
              <FaUserPlus className="text-secondary" />
            </h1>
          </div>

          {/* Requests List */}
          <div className="grid gap-6">
            <AnimatePresence>
              {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                  request.fromUserId;

                return (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-base-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Profile Section */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <img
                            alt={`${firstName}'s avatar`}
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
                          {about && (
                            <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                              {about}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex md:flex-col gap-3 justify-end">
                        <button
                          className={`btn btn-success btn-sm gap-2 ${
                            processing.id === request._id && processing.action === "accepted"
                              ? "loading"
                              : ""
                          }`}
                          onClick={() => reviewRequest("accepted", request._id)}
                          disabled={processing.id === request._id}
                        >
                          {!(processing.id === request._id && processing.action === "accepted") && (
                            <FaCheck />
                          )}
                          Accept
                        </button>
                        <button
                          className={`btn btn-error btn-sm gap-2 ${
                            processing.id === request._id && processing.action === "rejected"
                              ? "loading"
                              : ""
                          }`}
                          onClick={() => reviewRequest("rejected", request._id)}
                          disabled={processing.id === request._id}
                        >
                          {!(processing.id === request._id && processing.action === "rejected") && (
                            <FaTimes />
                          )}
                          Reject
                        </button>
                      </div>
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

export default Requests;
