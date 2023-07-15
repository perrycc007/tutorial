import cookie from "react-cookie";
import jwt_decode from "jwt-decode";

// Check if the user is authenticated
export const isAdmin = () => {
  const token = cookie.load("accessToken");
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.userid === 1; // Adjust the role check based on your authentication logic
  }
  return false;
};
