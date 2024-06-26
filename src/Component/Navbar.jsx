import React from "react";

//React Router Dom
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import logo from "../assets/logo.png";

const URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user, "user");
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <nav class="fixed top-0 bg-white mb-20 backdrop-blur-2xl z-50 w-full border">
      <div class="px-3 py-3 lg:px-5 lg:pl-3 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                document
                  .getElementById("logo-sidebar")
                  .classList.toggle("-translate-x-full");
              }}
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200  "
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <NavLink
              to={"/dashboard"}
              className="flex ms-2 items-center  md:me-24"
            >
              <span class="self-center text-xl font-semibold sm:text-2xl  cursor-pointer whitespace-nowrap dark:text-white">
                <img src={logo} className="w-40" />
              </span>
            </NavLink>
          </div>
          <div class="flex items-center">
            <div class="flex relative  items-center ms-3">
              <div>
                <button
                  type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-text-color "
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={(e) => {
                    e.stopPropagation();
                    let profile = document.getElementById("profile-menu");
                    const pro = profile.classList.value.includes("absolute");
                    // console.log(pro);
                    if (pro) {
                      profile.classList.remove("absolute");
                      profile.classList.add("hidden");
                    } else {
                      profile.classList.add("absolute");
                      profile.classList.remove("hidden");
                    }
                  }}
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 object-cover rounded-full"
                    src={
                      // user?.photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/podcast-application-react.appspot.com/o/default_pic%2Fvecteezy_default-profile-account-unknown-icon-black-silhouette_20765399.jpg?alt=media&token=4f0c367a-eaa7-44bb-9d87-3609fa380704"
                    }
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                id="profile-menu"
                class={`z-50 top-[38px] w-48 -left-40 hidden   my-4 text-base list-none shadow-xl border-text-color bg-gray-800 backdrop-blur-2xl divide-y divide-gray-100 rounded shadow `}
              >
                <div className="bg-white rounded">
                  <div class="px-4 py-3" role="none">
                    <p class="text-sm  dark:text-white" role="none">
                      {user.name}
                    </p>
                    <p
                      class="text-sm font-medium  truncate dark:text-gray-300"
                      role="none"
                    >
                      {user.email}
                    </p>
                  </div>
                  <hr />
                  <ul class="py-1" role="none">
                    <li>
                      <NavLink
                        to={`/edit-profile`}
                        className="block px-4 py-2 text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Edit Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/"
                        className="block px-4 py-2 text-sm hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={async () => {
                          await axios.get(`${URL}/auth/logout`, {
                            withCredentials: true,
                          });
                          navigate("/");
                        }}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
