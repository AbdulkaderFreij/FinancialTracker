import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { setIntendedUrl } from '../utils/auth';

function AuthNav () {
  let {setCurrentUser, setToken, currentUser} = useAuth();
  let history = useHistory();
  let [hideMobileNav, setHideMobileNav] = useState(true);

  const toggleMobileNav = () => setHideMobileNav(prevState => !prevState);
  const closeMobileNav = () => setHideMobileNav(true);

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    history.push('/');
    setIntendedUrl(null);
  };

  return (
    <div className="auth-nav flex flex-row h-16 border-b border-grey-light bg-indigo-900" >
      <div className="container flex-col lg:flex-row px-2 mx-auto flex items-center justify-between">
        <div className="left flex justify-between w-full lg:w-auto flex-1 lg:flex-initial">
          <ul className="list-reset flex items-center">
            <li>
              <NavLink
                to="/dashboard"
                activeClassName="font-bold"
                className="text-white font-bold no-underline text-indigo">Financial Tracker
              </NavLink>
            </li>
          </ul>

          <div
            onClick={toggleMobileNav}
            id="sidebar-open"
            className='z-50 flex px-6 items-center lg:hidden text-gray-700'>

            <span className={`svg-full ${!hideMobileNav ? 'mobile-nav-show' : ''}`}>
                MENU &nbsp;
              <svg className="fill-current" role="button" xmlns="http://www.w3.org/2000/svg" width="35" height="12" viewBox="0 0 35 12">
                <rect width="35" height="2"></rect>
                <rect y="5" width="24" height="2"></rect>
                <rect y="10" width="14" height="2"></rect>
              </svg>
            </span>
          </div>
        </div>

        <div
          className={`right lg:flex pt-8 lg:pt-0 right fixed lg:relative w-full lg:w-auto h-screen lg:h-auto ${hideMobileNav ? 'mobile-hidden' : ''}`}>
          <ul className="mt-8 py-8 lg:py-0 lg:mt-0 list-reset flex items-center bg-indigo-900 flex-col lg:flex-row">
            <li
              onClick={closeMobileNav}
              className="px-4 py-3 lg:py-0">
              <NavLink
                to={`/profile/${currentUser.id}`}
                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white underline lg:no-underline">
                {currentUser.name}
              </NavLink>
            </li>
            <li
              onClick={closeMobileNav}
              className="px-4 py-3 lg:py-0">
              <NavLink
                to="/dashboard"
                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white underline lg:no-underline">
                Dashboard
              </NavLink>
            </li>
            <li
              onClick={closeMobileNav}
              className="px-4 py-3 lg:py-0">
              <NavLink
                to="/transactions"
                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white underline lg:no-underline">
                Transactions
              </NavLink>
            </li>
            <li
              onClick={closeMobileNav}
              className="px-4 py-3 lg:py-0">
              <NavLink
                to="/goals"
                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white underline lg:no-underline">
                Goals
              </NavLink>
            </li>
            <li
              onClick={closeMobileNav}
              className="px-4 py-3 lg:py-0">
              <NavLink
                to="/reports"
                className="text-2xl font-bold lg:text-sm lg:font-light capitalize text-sm text-white underline lg:no-underline">
                Reports
              </NavLink>
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-3 lg:py-0">
              <Link
                to="/logout"
                className="capitalize text-2xl font-bold lg:text-sm lg:font-light text-white underline lg:no-underline">
                  Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AuthNav;
