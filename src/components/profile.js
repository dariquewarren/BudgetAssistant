import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logoutButton'
const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
   
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton/>
      </div>
    )
  );

};

export default Profile;