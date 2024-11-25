import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import "../styles/search.css";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

export default function Header() {
  const history = useHistory();


  const handleLogout = () => {
    // localStorage.removeItem("accessToken");
    history.push("/login");
  };

  const handleButtonClick = () => {
    // Push a new entry onto the history stack
    history.push("/liked");
  };
  return (
    <div className="container-fluid app">
      <header className="">
        <div className="row py-4" style={{ backgroundColor: "black" }}>
          <div className="col-md-2 header__logo"></div>
          <div className="col-md-5 header__middle d-flex justify-content-center">
            <button className="header__middle-RxCare header__middle-RxCare--Left rounded-full hover-btn">
              <RxCaretLeft size={35} className="text-white" />
            </button>
            <button className="header__middle-RxCare header__middle-RxCare--Right rounded-full hover-btn">
              <RxCaretRight size={35} className="text-white" />
            </button>

            <div className="header__home hover-btn">
              <i className="header__home-icon fa-solid fa-house" />
            </div>
            <div className="header__search d-flex">
              <div className="header__search-icon">
                <i className="header__search-icon--glass fa-solid fa-magnifying-glass" />
              </div>
              <input
                type="text"
                className="header__search-input"
                placeholder="Bạn muốn nghe nhạc gì?"
              />
            </div>
          </div>
          <div className="col-md-5 header__auth">
            <div className="header__auth-form d-flex float-end">
              <div className="header__auth-register">
                <Link to="/registration" className="header__auth-register--btn header__auth-btn hover-btn">
                  Đăng ký
                </Link>
              </div>
              <div className="header__auth-login">
                <Link to="/login" className="header__auth-login--btn header__auth-btn hover-btn">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
              <div className="relative min-h-[64px] min-w-[64px]">
                <img
                  alt="Image"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover"
                  sizes="100vw"
                  src={`http://localhost:4000/uploads/liked.png`}
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    inset: "0px",
                    color: "transparent",
                  }}
                />
              </div>
              <p
                className="font-medium truncate py-5"
                onClick={handleButtonClick}
              >
                Liked Songs
              </p>
              <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="text-black"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}