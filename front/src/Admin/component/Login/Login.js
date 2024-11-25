import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Sử dụng useHistory cho React Router v5
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = (props) => {

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        props.onLoginSuccess();

        if (response.data.user.role === "user") {
          history.push("/");
        } else {
          history.push("/admin/dashboard");
        }
      }
    } catch (error) {
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="app w-100">
      <div className="background-login">
        <div className="login__form">
          <div className="login__form-title">
            <div className="login__form-title--logo">
              <img src="./assets/img/logo_spotify.webp" alt="Logo Spotify" className="login__form-title--img w-100"/>
            </div>
            <div className="login__form-title--text">
              <h1>Log in to Spotify</h1>
            </div>
          </div>
          <div className="login__socialMedia">
            <button className="login__socialMedia-btn login__socialMedia-btn--google mb-3 input-50">
              <i className="fa-brands fa-google login__socialMedia-icon login__socialMedia-icon--google" />
              <span className="login__socialMedia-text">Đăng nhập bằng Google</span>
            </button>
            <button className="login__socialMedia-btn login__socialMedia-btn--facebook input-50">
              <i className="fa-brands fa-facebook login__socialMedia-icon login__socialMedia-icon--facebook" />
              <span className="login__socialMedia-text">Đăng nhập bằng Facebook</span>
            </button>
          </div>
          <div className="login__or">
            <div className="login__or-line" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login__input-form">
              <div className="login__input-item login__input--email mb-3">
                <input
                  className="px-3"
                  type="text"
                  placeholder="Tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="login__input-item login__input--password mb-3">
                <input
                  className="px-3"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login__input-btn mt-5 input-50">
                <button type="submit" className="login__input-submit">Đăng nhập</button>
              </div>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </form>

          <div className="login__password-forgot">
            <a className="login__password-link">
              Quên mật khẩu?
            </a>
          </div>
          <div className="login__account">
            <span className="login__account-text">Bạn chưa có tài khoản?</span>
            <Link to="/registration" className="login__account-link"> Đăng ký Spotify.</Link>
          </div>
        </div>
        <footer className="footer__reCAPTCHA">
          <p className="footer__reCAPTCHA-text">
            <span>Trang web này được bảo vệ bởi reCAPTCHA và áp dụng</span>
            <a className="footer__reCAPTCHA-link"> Điều khoản dịch vụ </a>
            <span>của </span> 
            <a className="footer__reCAPTCHA-link">Chính sách quyền riêng tư</a>
            <span> của Google.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
