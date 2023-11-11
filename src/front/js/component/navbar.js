import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignupPage = location.pathname === "/signup";
  const isPrivatePage = location.pathname === "/private";

  const handlelogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Verifica si la ruta es /, /private o /signup
  const isAllowedRoute = location.pathname === "/" || isPrivatePage || isSignupPage;

  if (!isAllowedRoute) {
    return null; // No renderizar el Navbar si no está en una ruta permitida
  }

  return (
    <nav className="navbar nav-bar bg-light">
      <div className="container">
        <h3 className="title mt-2">IAMPEDROLUIS</h3>
        <div className="ml-auto">
          {isSignupPage ? (
            <Link to="/">
              <button className="original-button">Log in</button>
            </Link>
          ) : (
            <>
              {isPrivatePage ? (
                <button className="original-button" onClick={handlelogout}>
                  Log Out
                </button>
              ) : (
                <Link to="/signup">
                  <button className="original-button">Sign Up</button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
