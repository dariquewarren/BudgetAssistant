import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logoutButton'
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-sg8fbv3t.us.auth0.com/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'client_credentials',
    client_id: 'YsUPHTB3zq0gdAuAAd41YYi0ffnwvYEI',
    client_secret: '3f7EwPwQ0hIgnDAzaatlgzIv6xFmvOg_UkVGYMwoaScVaWp4M17Hh3byYEIp8JbP',
    audience: 'https://dev-sg8fbv3t.us.auth0.com/api/v2/'
  }
};
 
  const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    useEffect(() => {
      const getUserMetadata = async () => {
        const domain = "dev-sg8fbv3t.us.auth0.com";
    
        try {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          });
    
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const { user_metadata } = await metadataResponse.json();
    
          setUserMetadata(user_metadata);
        } catch (e) {
          console.log(e.message);
        }
      };
      if (user){
    
        return  axios.request(options).then(function (response) {
          console.log(response.data);
        }).catch(function (error) {
          console.error(error);
        });
        }
         
      getUserMetadata();
    }, []);





    return (
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )}
        </div>
      )
    );
  };
  

export default Profile;