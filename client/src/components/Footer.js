import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        zIndex: 1000,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 0,
        margin: 0,
        backgroundColor: "#ecebea",
        color: "#6c6f75",
        textAlign: "center",
        height: "2.5rem",
        lineHeight: "2.5rem",
        fontWeight: "bold",
        fontSize: "0.8rem",
      }}
    >
      © 2023 <span style={{ color: "#ED4343" }}>Code</span>YourFuture 'A Class
      of Our Own'
    </footer>
  );
};

export default Footer;
