import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "../common/TopBar";
import '../css/component/dashboard.css';
import SmallSidebar from "../common/smallSidebar";

function SharedLayout() {

    const [isToggle,setToggle]=useState(false);
    return (
        <div className={isToggle?"container left":"container"}>
            <SmallSidebar setToggle={setToggle} isToggle={isToggle}/>
            <Sidebar setToggle={setToggle} isToggle={isToggle}/>
            <div>
                <TopBar setToggle={setToggle} isToggle={isToggle}/>
                <div className="dashboard">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SharedLayout;