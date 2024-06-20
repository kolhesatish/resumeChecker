import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import { getCurrentUser } from "./store/reducers/auth";
import ResumeChecker from "./fileCh/ResumeChecker";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <Link to="/">Home</Link>
      {auth.currentUser === null && (
        <React.Fragment>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </React.Fragment>
      )}
      {auth.currentUser && <ResumeChecker />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
