import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaSignInAlt, FaUserPlus, FaGithub, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm 
        ? { emailId: formData.emailId, password: formData.password }
        : formData;

      const res = await axios.post(
        BASE_URL + endpoint,
        payload,
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.data || res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-base-300 rounded-2xl shadow-xl overflow-hidden border border-base-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              {isLoginForm ? (
                <>
                  <FaSignInAlt />
                  <span>Welcome Back</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span>Join TekLync</span>
                </>
              )}
            </h1>
            {/* <p className="text-white/90 mt-1">
              {isLoginForm 
                ? "Sign in to connect with developers" 
                : "Create your account to get started"}
            </p> */}
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      placeholder="John"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      placeholder="Doe"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  placeholder="john@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                  {isLoginForm && (
                    <span className="label-text-alt">
                      <button 
                        type="button" 
                        className="link link-hover text-xs"
                        onClick={() => navigate("/forgot-password")}
                      >
                        Forgot password?
                      </button>
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                {!isLoginForm && (
                  <span className="label-text-alt mt-1">
                    Minimum 6 characters
                  </span>
                )}
              </div>

              {error && (
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full mt-6 gap-2"
                disabled={
                  isLoading ||
                  !formData.emailId || 
                  !formData.password || 
                  (!isLoginForm && (!formData.firstName || !formData.lastName))
                }
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : isLoginForm ? (
                  <>
                    <FaSignInAlt />
                    Login
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Sign Up
                  </>
                )}
              </button>
            </form>

            <div className="divider my-6">OR</div>

            <div className="flex gap-4 justify-center">
              <button className="btn btn-outline gap-2">
                <FaGoogle />
                Google
              </button>
              <button className="btn btn-outline gap-2">
                <FaGithub />
                GitHub
              </button>
            </div>

            <p className="text-center mt-6">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="link link-primary font-medium"
                onClick={() => {
                  setIsLoginForm(!isLoginForm);
                  setError("");
                }}
              >
                {isLoginForm ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;