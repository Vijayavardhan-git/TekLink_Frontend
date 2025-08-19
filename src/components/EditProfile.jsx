import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { FaSave, FaUndo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age || "",
    gender: user.gender || "",
    about: user.about || "",
  });

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const res = await axios.patch(`${BASE_URL}/profile`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      age: user.age || "",
      gender: user.gender || "",
      about: user.about || "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Left: Edit Form */}
          <div className="flex-1">
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 h-full flex flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">
                      Profile Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={formData.photoUrl}
                    className="input input-bordered w-full"
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      className="input input-bordered w-full"
                      onChange={handleChange}
                      min="18"
                      max="99"
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      className="select select-bordered w-full"
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                      <option value="others">others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">About You</span>
                    <span className="label-text-alt">Max 250 characters</span>
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    className="textarea textarea-bordered w-full h-32"
                    onChange={handleChange}
                    maxLength="250"
                    placeholder="Tell others about your skills, interests, and what you're looking for..."
                  ></textarea>
                  <div className="text-right text-sm text-base-content/70 mt-1">
                    {formData.about.length}/250
                  </div>
                </div>

                {error && (
                  <div className="alert alert-error shadow-lg">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
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
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 mt-6 border-t border-base-300">
                <button
                  onClick={resetForm}
                  className="btn btn-outline flex-1 gap-2"
                >
                  <FaUndo />
                  Reset
                </button>
                <button
                  onClick={saveProfile}
                  disabled={isSubmitting}
                  className="btn btn-primary flex-1 gap-2"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FaSave />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Right: Profile Preview */}
          <div className="flex-1">
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-300 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-6 text-center">
                Profile Preview
              </h3>
              <div className="flex justify-center">
                <UserCard user={formData} isPreview />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="toast toast-top toast-center z-50"
          >
            <div className="alert alert-success shadow-lg">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Profile updated successfully!</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProfile;
