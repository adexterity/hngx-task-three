import React from "react";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="footer-section container flex justify-center items-center pt-5 pb-5 flex-col">
      <div className="icons mb-6">
        <span className="facebook mr-10 ">
          <i className="fa-brands fa-square-facebook text-[20px]"></i>
        </span>
        <span className="instagram mr-10 ">
          <i className="fa-brands fa-instagram text-[20px]"></i>
        </span>
        <span className="twitter mr-10 ">
          <i className="fa-brands fa-twitter text-[20px]"></i>
        </span>
        <span className="youtube ">
          <i className="fa-brands fa-youtube text-[20px]"></i>
        </span>
      </div>
      <div className="flex gap-3 sm:gap-10 mb-6 text-[15px]">
        <p className="font-bold">Conditions of Use</p>
        <p className="font-bold">Privacy & Policy</p>
        <p className="font-bold">Press Room</p>
      </div>
      <div className="copyright text-[#6B7280]">
        &copy; {date.getFullYear()} PhotoGallery by Adexterity
      </div>
    </footer>
  );
};

export default Footer;
