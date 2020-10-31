import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../components/logoutButton'
var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://dev-sg8fbv3t.us.auth0.com/oauth/token',
  mode: 'no-cors',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'client_credentials',
    client_id: 'YsUPHTB3zq0gdAuAAd41YYi0ffnwvYEI',
    client_secret: '3f7EwPwQ0hIgnDAzaatlgzIv6xFmvOg_UkVGYMwoaScVaWp4M17Hh3byYEIp8JbP',
    audience: 'https://dev-sg8fbv3t.us.auth0.com/api/v2/'
  }
};
 if (user){
    
  return  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  }

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        
      </div>
    )
  );
};


export default Profile;