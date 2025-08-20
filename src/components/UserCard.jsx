import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import {
  FaHeart,
  FaTimes,
  FaVenusMars,
  FaBirthdayCake,
  FaInfoCircle,
} from "react-icons/fa";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Failed to send request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-xs md:max-w-sm mx-auto shadow-xl border border-base-300 transition-transform hover:scale-[1.01] duration-200">
      {/* Profile Image */}
      <figure className="h-60 w-full bg-base-200 flex items-center justify-center rounded-t-lg overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="h-full object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://avatar.vercel.sh/${firstName}`;
          }}
        />
      </figure>

      {/* Card Body */}
      <div className="card-body p-5">
        {/* Name */}
        <h2 className="card-title text-xl md:text-2xl justify-center mb-1 text-center">
          {firstName} {lastName}
        </h2>

        {/* Age + Gender */}
        {(age || gender) && (
          <div className="flex justify-center items-center gap-4 text-sm text-base-content/70 mb-2">
            {age && (
              <span className="flex items-center gap-1">
                <FaBirthdayCake className="text-primary" />
                {age} yrs
              </span>
            )}
            {gender && (
              <span className="flex items-center gap-1">
                <FaVenusMars className="text-secondary" />
                {gender}
              </span>
            )}
          </div>
        )}

        {/* About Section */}
        {about && (
          <div className="bg-base-200 p-4 rounded-lg mt-4">
            <div className="flex items-center gap-2 mb-2 text-base-content/80">
              <FaInfoCircle className="text-primary" />
              <span className="font-semibold">About</span>
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              {about}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center gap-4 mt-6">
          <button
            className={`btn btn-outline border-error text-error w-24 ${
              isLoading ? "btn-disabled" : ""
            }`}
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <FaTimes className="text-lg" />
                Ignore
              </>
            )}
          </button>

          <button
            className={`btn bg-primary border-none text-white w-24 hover:bg-secondary ${
              isLoading ? "btn-disabled" : ""
            }`}
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <FaHeart className="text-4xl" />
                Connect
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
