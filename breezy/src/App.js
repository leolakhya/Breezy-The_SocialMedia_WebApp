import React, {useEffect} from 'react';
import Header from "./components/home/header/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {loadUser} from "./features/action/userAction";
import Home from "./components/home/homepage/Home";

const AuthPage=React.lazy(() =>
import("./components/home/auth/authPage"));
const UserProfile=React.lazy(()=>
import("./components/profile/UserProfile"));

function App() {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadUser());
    }, [])

    const {isAuthenticated} = useSelector((state) => state.user); //check if the user is authenticated

    return (
        <Router>
            <div className="App">
                {isAuthenticated ? <Header/> : null}
                <Routes>
                    <Route path={'/'} exect element={isAuthenticated ? <Home /> : <AuthPage/>}/>
                    <Route path={'/user/account'} element={isAuthenticated ? <UserProfile/> : <AuthPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;