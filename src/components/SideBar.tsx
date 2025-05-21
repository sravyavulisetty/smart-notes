import React from 'react';
import { sidebarRoutes } from '../utils/routes';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
      <ul className="flex flex-col gap-6 items-baseline justify-center">
        {sidebarRoutes.map(({ path, label, icon: Icon }) => (
            <NavLink to={path}
            key={path}
            style={({isActive}) => ({
                color: isActive ? "blue" : 'black'
            })}
             >
            <li className="flex items-center gap-2">
              <Icon className="text-xl"/>
              {label}
              </li>
            </NavLink>
      
        ))}
      </ul>
  );
};

export default SideBar;

