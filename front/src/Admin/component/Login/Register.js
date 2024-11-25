import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { registerRoute } from "../../utils/APIRoutes";

export default function Register() {

  const history = useHistory();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      history.push("/admin");
    }
  }, [history]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu phải giống nhau.");
      return false;
    } else if (username.length < 3) {
      setError("Tên người dùng phải dài ít nhất 3 ký tự.");
      return false;
    } else if (password.length < 8) {
      setError("Mật khẩu phải dài ít nhất 8 ký tự.");
      return false;
    } else if (!email.includes("@")) {
      setError("Vui lòng nhập email hợp lệ.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password, email } = values;
      try {
        const response = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (response.data.status === false) {
          setError(response.data.msg);
          return;
        }

        if (response.data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(response.data.user)
          );
          history.push("/admin");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
        console.error("Lỗi:", error);
      }
    }
  };

  return (
    <div className="app w-100">
      <div className="background-register">
      <header className="header__brand">
        <div className="header__brand-logo">
          <img
            src="./assets/img/logo_spotify.webp"
            alt=""
            className="header__brand-img"
          />
        </div>
        <div className="header__brand-title">
          <h1>Sign up to start listening</h1>
        </div>
      </header>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="register__form" >
            <div className="register__form-item register__form--fullName mb-3">
              <input
                className="register__form-input p-3"
                type="text"
                placeholder="Tên người dùng"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div className="register__form-item register__form--email mb-3">
              <input
                className="register__form-input p-3"
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="register__form-item register__form--password mb-3">
              <input
                className="register__form-input p-3"
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className="register__form-item register__form--password mb-3">
              <input
                className="register__form-input p-3"
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="register__form-btn mt-5 input-50">
              <button type="submit" className="register__form-submit">Đăng ký</button>
            </div>
          </div>
          <div className="register__or">
            <div className="register__or-line" />
            <div className="register__or-title">or</div>
            <div className="register__or-line" />
          </div>
          <div className="register__socialMedia">
            <button className="register__socialMedia-btn register__socialMedia-btn--google mb-3 input-50">
              <i className="fa-brands fa-google register__socialMedia-icon register__socialMedia-icon--google" />
              <span className="register__socialMedia-text">Đăng ký bằng Google</span>
            </button>
            <button className="register__socialMedia-btn register__socialMedia-btn--facebook input-50">
              <i className="fa-brands fa-facebook register__socialMedia-icon register__socialMedia-icon--facebook" />
              <span className="register__socialMedia-text">
                Đăng ký bằng Facebook
              </span>
            </button>
          </div>
          <hr className="register__hr" />
          <div className="register__account">
            <span className="register__account-text">Bạn đã có tài khoản?</span>
            <Link to="/admin" className="register__account-link"> Đăng nhập tại đây.</Link>
          </div>
        </form>
        </div>
      </div>
      <footer className="footer__reCAPTCHA">
        <p className="footer__reCAPTCHA-text">
          <span>Trang web này được bảo vệ bởi reCAPTCHA và áp dụng </span>
          <a className="footer__reCAPTCHA-link">Chính sách quyền riêng tư</a>
          <span> cũng như </span>
          <a className="footer__reCAPTCHA-link">Điều khoản dịch vụ</a>
          <span> của Google.</span>
        </p>
      </footer>
    </div>

  );
}
