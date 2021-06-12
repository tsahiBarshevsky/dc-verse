import React from 'react';
import { FaTimes } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';

export default function Sidebar({isOpen, toggle}) 
{
    const style = {
        opacity: (isOpen ? '100%' : '0%'),
        top: (isOpen ? '0' : '-100%')
    };

    return (
        <aside className="mobile-navbar-container" style={style} isOpen={isOpen} onClick={toggle}>
            <div className="top-line">
                <img src={Logo} alt="DC Verse" />   
                <FaTimes className="close-icon" />
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-link">
                    כל הכתבות
                </li>
                <li className="sidebar-link">
                    קטגוריות    
                </li>
                <li className="sidebar-link">
                    אודות   
                </li>
            </ul>
        </aside>
    )
}