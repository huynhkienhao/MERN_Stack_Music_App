import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Sử dụng useHistory cho React Router v5
import axios from "axios";
import "./Login.css"; // Import file CSS

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
    <div className="login">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
