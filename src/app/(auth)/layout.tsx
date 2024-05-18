import React from "react";
import "./layout.css"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="auth_page">
      <div className="left_side">
        <h1>Welcome to Nanas Blog App</h1>
        <p>Blog till your hearts content</p>
      </div>
      <div className="right_side">
        {children}
      </div>
    </div>
  );
};

export default Layout;
