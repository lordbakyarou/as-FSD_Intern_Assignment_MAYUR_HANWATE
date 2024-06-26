import React from "react";

import { NavLink } from "react-router-dom";

//React Icons
import { IoCreate } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside
      id="logo-sidebar"
      class="fixed top-0  h-fit left-0 z-40 w-64 h-screen overflow-y-hidden pt-12 transition-transform -translate-x-full shadow  sm:translate-x-0  dark:border-gray-700"
      aria-label="Sidebar"
      onClick={(e) => {
        e.stopPropagation();
        document
          .getElementById("logo-sidebar")
          .classList.remove("-translate-x-full");
        // console.log(document.getElementById("logo-sidebar").classList);
      }}
    >
      <div class="min-h-screen px-3 pb-4 pt-10  ">
        <ul class="space-y-2 font-medium">
          <li>
            <NavLink
              to="/counter"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              // onClick={handleNavLinkClick}
            >
              <FaPlusSquare className="text-gray-300 text-2xl" />
              <span class="ms-3 text-gray-300 whitespace-nowrap">Counter</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/edit-profile"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
              // onClick={handleNavLinkClick}
            >
              <MdEdit className="text-gray-300 text-2xl" />
              <span class="flex-1 ms-3  text-gray-300 whitespace-nowrap">
                Edit Profile
              </span>
            </NavLink>
          </li>

          <hr />
          <li>
            <NavLink
              to="https://mayur.fun"
              target="_blank"
              className="flex items-center p-2 text-gray-200 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 group"
            >
              <span class="flex-1 ms-3 text-gray-400 font-normal whitespace-nowrap">
                About Me
              </span>
            </NavLink>
          </li>
          <li>
            <div
              className="footer text-xs flex text-gray-400 flex-col gap-4 pl-4 pr-4
"
            >
              <div className="just-footer">
                Follow me on{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink
                    to="https://www.linkedin.com/in/mayurhanwate/"
                    target="_blank"
                  >
                    LinkedIn
                  </NavLink>
                </span>{" "}
                ·{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink to="https://github.com/lordbakyarou" target="_blank">
                    Github
                  </NavLink>
                </span>{" "}
                ·{" "}
                <span className="cursor-pointer hover:text-white">
                  <NavLink
                    to="https://leetcode.com/mayur1710hanwate/"
                    target="_blank"
                  >
                    Leetcode
                  </NavLink>
                </span>
              </div>
              <div className="actual-footer">
                © 2024 UPLIANCE.AI TEST BY MAYUR HANWATE
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
