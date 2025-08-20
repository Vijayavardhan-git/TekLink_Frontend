// Feed.jsx
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { FaUsers, FaSpinner, FaHeartBroken } from "react-icons/fa";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed?.length > 0) {
      setLoading(false); // Immediately stop loading if feed exists
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load feed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mx-auto mb-4" />
          <p className="text-lg">Finding amazing developers for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!feed || feed.length <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-base-100 rounded-xl shadow-lg border border-base-300">
          <FaHeartBroken className="text-4xl text-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary">No new connections</span> found!
          </h2>
          <p className="text-base-content/70 mb-4">
            We've shown you all the amazing developers in your area. Check back
            later for new connections!
          </p>
          <button onClick={getFeed} className="btn btn-primary">
            <FaUsers className="mr-2" />
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-primary">Discover</span>{" "}
            <span className="text-secondary">Developers</span>
          </h1>
        </div>

        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
