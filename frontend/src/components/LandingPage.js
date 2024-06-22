import React from "react";
import main from '../images/main.svg';
import Register from "./Register";
import NavBar from "../common/NavBar";
import '../css/component/landingPage.css';

function LandingPage() {
    return (
        <main className="main-container">
            <NavBar />
            <section>
                <div className="image">
                    <img src={main} alt="background-image"></img>
                </div>
                <div className="welcome">
                    <h1>Welcome to Job <span>Tracking </span>App</h1>
                    <Register />
                </div>
            </section>
        </main>
    )
}

export default LandingPage;