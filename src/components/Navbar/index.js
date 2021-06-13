import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { FaBars } from 'react-icons/fa';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Logo from '../../images/logo.png';

export default function Navbar({toggle}) 
{
    const [navbar, setNavbar] = useState(false);
    const isMobile = useMediaQuery('(max-width: 960px)');

    const toggleHome = () => 
    {
        if (window.location.pathname === '/')
        animateScroll.scrollToTop();
        else
            window.location.replace('/');
    }

    const changeBackground = () =>
    {
        window.scrollY >= 70 ? setNavbar(true) : setNavbar(false);
    }

    if (window.location.pathname === '/')
        window.addEventListener('scroll', changeBackground);

    return (
        <nav 
            style={
                window.location.pathname !== '/' ? 
                { backgroundColor: '#222222',
                  boxShadow: '0 2px 3px rgba(15, 15, 15, 0.25)' } : {}} 
            className={isMobile || navbar ? "main-navbar active" : "main-navbar"}>
            <div className="navbar-container">
                <div className="logo" onClick={() => toggleHome()}>
                    <img src={Logo} alt="DC Verse" />
                </div>
                <div className="mobile-icon" onClick={toggle}>
                    <FaBars />
                </div>
                <ul className="nav-menu">
                    <li className="nav-link">
                        <Link to='/archive' className="link">כל הכתבות</Link>
                    </li>
                    <li className="nav-link">
                        <Link to='/categories' className="link">קטגוריות</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}