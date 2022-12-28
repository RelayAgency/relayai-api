import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';

import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import { Link, NavLink } from 'react-router-dom';

import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  const { currentColor, activeMenu, setActiveMenu, screenSize, currentMode } = useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };



  return (

    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">

      {isAuthenticated &&

        <div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>

          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            {user?.picture &&
              <NavLink
                to={`/profile`}
                key={'profile'}
                onClick={handleCloseSideBar}
              >
                <img
                  className="rounded-full h-24 w-24"
                  src={user.picture}
                  alt={user.name}
                />
              </NavLink>
            }
            <div>
              <NavLink
                to={`/profile`}
                key={'profile'}
                onClick={handleCloseSideBar}
              >
                {user.name ? <p className="font-semibold text-xl dark:text-gray-200"> {user.name}</p> : <p className="font-semibold text-xl dark:text-gray-200"> {user.nickname}</p>}
              </NavLink>
              {user.given_name ? <p className="text-gray-500 text-sm dark:text-gray-400">Member</p> : <p className="text-gray-500 text-sm dark:text-gray-400">Member</p>}
              {user.email ? <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user.email}</p> : <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user.email}</p>}

            </div>
          </div>
          <div>
            {userProfileData.map((item, index) => (
              <NavLink
                to={`/${item.name}`}
                key={item.name}
                onClick={handleCloseSideBar}
              >
                <div key={index}
                  className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"

                >



                  <button
                    type="button"
                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                    className=" text-xl rounded-lg p-3 hover:bg-light-gray"

                  >
                    {item.icon}
                  </button>

                  <div>
                    <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                    <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
                  </div>




                </div>
              </NavLink>
            ))}
          </div>
        </div>
      }
      <div className="mt-5">
        <LoginButton />
        <LogoutButton />

      </div>
    </div>

  );
};

export default UserProfile;