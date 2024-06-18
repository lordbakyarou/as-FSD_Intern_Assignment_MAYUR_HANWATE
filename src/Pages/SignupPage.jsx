import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Costants Icons and Images
import { BsArrowClockwise } from "react-icons/bs";
import { FaEye, FaEyeSlash, FaFacebookSquare } from "react-icons/fa";
import signupImage from "../assets/signup-image.jpg";
import googleAuth from "../assets/google.png";

const URL = import.meta.env.VITE_API_URL;

const SignupPage = () => {
  const [signupUser, setSignupUser] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userCreationError, setUserCreationError] = useState(null);

  const navigate = useNavigate();

  function setUserProperties(e) {
    setSignupUser({ ...signupUser, [e.target.name]: e.target.value });
  }

  function validateEmail(email) {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    return true;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function createUser(e) {
    e.preventDefault();
    setUserCreationError(null);
    setIsLoading(true);

    try {
      const createdUser = await axios.post(
        `${URL}/auth/signup/`,
        {
          username: signupUser.username,
          email: signupUser.email,
          name: signupUser.name,
          password: signupUser.password,
        },
        { withCredentials: true }
      );

      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUserCreationError(error.response.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function checkIfUserAlreadyLoggedin() {
      try {
        await axios.get(`${URL}/auth/check`, { withCredentials: true });
        navigate("/dashboard");
      } catch (error) {}
    }

    checkIfUserAlreadyLoggedin();
  }, []);

  return (
    <div className="flex justify-evenly gap-10 px-10 max-md:flex-col-reverse">
      <div className="flex flex-col gap-2 justify-center max-md:items-center">
        <div>
          {/* Hello Text */}
          <div className="flex gap-4 flex-col mb-5">
            <h1 className="font-bold text-2xl">Welcome 🌟</h1>
            <p className="w-64 text-sm">
              {" "}
              Your journey begins here – let's make something beautiful
              together! 💖
            </p>
          </div>

          <div className="flex flex-col gap-2.5 relative max-md:items-center">
            {/* Login Form */}
            <form onSubmit={createUser} className="flex flex-col gap-4">
              <div className="input-fullname relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                  onChange={(e) => setUserProperties(e)}
                />
                <label
                  className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-[0.60rem] peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                >
                  Full Name
                </label>
              </div>

              <div className="input-username relative">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                  onChange={(e) => setUserProperties(e)}
                />
                <label
                  className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-[0.60rem] peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                >
                  Username
                </label>
              </div>

              <div className="input-username relative">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                  onChange={(e) => setUserProperties(e)}
                />
                <label
                  className="absolute
                 transition-all
                  left-2.5 -top-0
                   text-gray-400 
                   text-[0.60rem] peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                >
                  Email
                </label>
              </div>

              <div className="input-password relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="peer bg-gray-50 w-full h-10 p-2 text-xs rounded border focus:outline-none focus:border-gray-400 placeholder-transparent"
                  onChange={(e) => setUserProperties(e)}
                />
                <label
                  className="absolute
                 transition-all
                  left-2.5 -top-0.5
                   text-gray-400 
                   text-[0.60rem] peer-placeholder-shown:text-xs
                    peer-placeholder-shown:top-3
                    pointer-events-none"
                >
                  Password
                </label>

                {signupUser.password && (
                  <div
                    className="absolute top-2.5 right-2 text-lg text-gray-800 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>

              <div className="login-button">
                <button
                  className={`w-80 cursor-pointer  h-10 border rounded-lg
                     text-white font-semibold  flex justify-center items-center
                      ${
                        validateEmail(signupUser.email) &&
                        signupUser.password.length >= 8
                          ? "bg-gray-800"
                          : "bg-gray-600"
                      }
                     `}
                  type="submit"
                >
                  {isLoading ? (
                    <BsArrowClockwise className="animate-spin text-xl " />
                  ) : (
                    "Signup"
                  )}
                </button>
                {userCreationError && (
                  <div className="error">
                    <p className="flex justify-center items-center text-red-400">
                      {userCreationError}
                    </p>
                  </div>
                )}
              </div>
            </form>

            <div className="flex  items-center justify-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="mx-4 text-gray-600 font-semibold text-gray-500">
                OR
              </p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center items-center gap-2 rounded p-2 bg-light-blue ">
              <img src={googleAuth} width={20} />
              <span className="text-blue-900 font-semibold cursor-pointer">
                Sign up with google
              </span>
            </div>
            <div className="flex items-center justify-center p-5 gap-1">
              <span>Have an account?</span>
              <span className="text-blue-400 font-semibold cursor-pointer">
                <NavLink to="/">Login</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen p-5  flex jusity-start max-md:h-96 max-sm:h-64">
        <img
          src={signupImage}
          alt="home-page-photo"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default SignupPage;
