import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import googlePlayImg from "../../assets/google-play.png";
import appleStoreImg from "../../assets/app-store.png";
import {
  FaSquareInstagram,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa6";

function Footer() {
  return (
    <div className="bg-black md:px-[80px] px-[10px] py-8 ">
      <div className="flex gap-3 flex-wrap justify-between">
        <div>
          <h3 className="text-white font-bodyFont font-bold text-2xl">
            Shramik <span className="text-blue-400">Saathi</span>
          </h3>
          <div className="text-gray-500 flex flex-col gap-2">
            <p className="text-gray-300 text-xl py-2 font-bold">Location</p>
            <div className="flex items-center gap-2">
              <IoLocationOutline className="text-white" />
              <p> Patna Bihar 80001</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-white text-xs" />
              <p> +91 9162284719</p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline className="text-white" />
              <a href="#"> ujjwal@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="text-gray-400">
          <h2 className="text-white font-bold pb-2">Customer Care</h2>
          <ul className="flex flex-col gap-[6px]">
            <li className="cursor-pointer">Contact Us</li>
            <li className="cursor-pointer">FAQS</li>
            <li className="cursor-pointer">Returns & Exchanges</li>
            <li className="cursor-pointer">Shipping & Handling</li>
            <li className="cursor-pointer">Terms of Service</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-bold text-xl">Install App</h2>
          <p className="text-gray-300 pt-2">from Apple store or Google Play</p>
          <div className="flex gap-2">
            <img className="w-[120px] " src={appleStoreImg} alt="" />
            <img className="w-[120px]" src={googlePlayImg} alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-gray-400">
          © 2024 Shramik saathi All Rights Reserved.
        </p>
        <div className="flex gap-3 text-2xl text-white pt-5">
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaSquareInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/ujjwaluks/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
