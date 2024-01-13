import React, { useEffect, useState } from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/manageLocalStorage';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequiredUser = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  const [  setLoading] = useState(true);
  

  // useEffect(() => {
    // Simulate an asynchronous operation to fetch user data
    // Replace this with actual user authentication logic
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return user ? <Outlet /> : <Navigate to={`/login`} /> 
  // return <Outlet/>
};

export default RequiredUser;
