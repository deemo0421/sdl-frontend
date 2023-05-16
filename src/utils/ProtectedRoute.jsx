import React, { useEffect, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/login/Login';

export const ProtectedLogin = () => {
    const auth = localStorage.getItem("accessToken");
    console.log(auth);
    return (
        !auth ? <Outlet /> : auth ? <HomePage /> : <Loader />
    )
}

export const ProtectedRoute = () => {
    const auth = localStorage.getItem("accessToken");
    return (
        auth ? <Outlet /> : !auth ? <Navigate to='/'/> : <Loader />
    )
}