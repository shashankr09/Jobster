import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/logo.svg';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaTimes, FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import '../css/component/sidebar.css';
import NavBar from "./NavBar";




function SmallSidebar({ setToggle, isToggle }) {

    const sidebarItems = [
        {
            itemName: 'Stats',
            path: '/',
            innerPathList: ['/'],
            icon: <IoBarChartSharp />
        },
        {
            itemName: 'Jobs',
            path: '/jobs',
            innerPathList: ['/jobs'],
            icon: <MdQueryStats />
        },
        {
            itemName: 'Add Job',
            path: '/createJob',
            innerPathList: ['/createJob'],
            icon: <FaWpforms />
        },
        {
            itemName: 'My Profile',
            path: '/profile',
            innerPathList: ['/profile'],
            icon: <ImProfile />
        }
    ]

    const navigate = useNavigate();

    const optionClick = (e, path) => {
        e.preventDefault();
        setToggle(!isToggle);
        navigate(path);
    }
    return (
        <div className="small-sidebar">
            <div>
                <NavBar />
                <button className='close-btn' onClick={(e) => setToggle(!isToggle)}>
                    <FaTimes />
                </button>
            </div>

            <ul>
                {
                    sidebarItems.map((item, index) => {
                        return <li key={item.itemName} className={item.innerPathList.includes(window.location.pathname) ? "nav-list active" : "nav-list"}>
                            <Link to="" onClick={(e) => optionClick(e, item.path)}>
                                <span>
                                    {item.icon}
                                </span>
                                {item.itemName}
                            </Link>
                        </li>
                    })
                }

            </ul>
        </div>
    )
}

export default SmallSidebar;