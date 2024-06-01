import React from 'react';
import './sidebarButtons.css';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

export default function SidebarButtons(props) {
    /* in react router dom we have useLocation Hook to tell url which is currently active */
    const location = useLocation();
    const isActive = location.pathname/* gives current path name */ === props.to/* button we have clicked on sidebar */;
    /* if isActive is true we have to add a class to the div btn-body */
    const btnClass = isActive ? "btn-body active" : "btn-body";
  return (
    <Link to={props.to}>
    <div className={btnClass}> {/* btn-body class */}
        <IconContext.Provider value={{size:'24px', className:'btn-icon'}}>
        {props.icon}
        <p className='btn-title'>{props.title}</p>
        </IconContext.Provider>
    </div>
    </Link>
  )
}
