import Header from "@/components/Header/Header";
import React from "react";
import "./layout.css"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default layout;
