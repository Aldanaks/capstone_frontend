import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-custom-gray text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - This WebSite is Powered by{" "}
            <h1 className="text-bold text-custom-primary-button"> Fluid </h1>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
