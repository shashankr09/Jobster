import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/component/topbar.css';
import { FaAlignLeft } from 'react-icons/fa';
import { store } from "../store/store";

function TopBar({ setToggle, isToggle }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        store.dispatch({ type: 'RESET' })
        navigate('/');
    }

    return (
        <div className="topbar">
            <div>
                <button type="button" className="alignIcon" onClick={(e) => setToggle(!isToggle)}>
                    <FaAlignLeft />
                </button>
            </div>
            <div className="text">
                <span>Dashboard</span>
            </div>
            <button type="button" className="btn" onClick={(e) => handleLogout()}>SignOut</button>
        </div>
    )
}

export default TopBar;