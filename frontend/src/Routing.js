import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";


function Routing() {

    const LandingPage = lazy(() => import('./components/LandingPage'));
    const Jobs = lazy(() => import('./components/Jobs'));
    const Dashboard = lazy(() => import('./components/Dashboard'));
    const SharedLayout = lazy(() => import('./components/SharedLayout'));
    const CreateJob = lazy(() => import('./components/CreateJob'));
    const Profile = lazy(() => import('./components/Profile'));

    const isLogin = useSelector(state => state.user.loginStatus);

    return (
        <Routes>
            <Route path="/" element={isLogin ?
                <Suspense fallback={<></>}>
                    <SharedLayout />
                </Suspense> : <Suspense fallback={<></>}>
                    <LandingPage />
                </Suspense>}>
                <Route index element={
                    <Suspense fallback={<></>}>
                        <Dashboard />
                    </Suspense>
                } />
                <Route path="/createJob" element={<Suspense fallback={<></>}>
                    <CreateJob />
                </Suspense>} />
                <Route path="/jobs" element={
                    <Suspense fallback={<></>}>
                        <Jobs />
                    </Suspense>
                } />
                <Route path="/profile" element={<Suspense fallback={<></>}>
                    <Profile />
                </Suspense>} />
            </Route>
            <Route path="/register" element={<Suspense fallback={<></>}>
                <LandingPage />
            </Suspense>} />
        </Routes>
    )
}

export default Routing;