import React, { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LOGIN_URL = "https://absh.onrender.com/api/v1/staff-auth/doc_login/";

const DoctorLogin = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
  
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  
    let navigate = useNavigate();
  
    useEffect(() => {
      userRef.current.focus();
    }, []);
  
    useEffect(() => {
      setErrMsg("");
    }, [username, password]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const v2 = username;
      const v3 = password;
      if (!v2 || !v3) {
        setErrMsg("Invalid Entry");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({ username, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setLoading(false);
        const accessToken = response?.data?.data?.token;
  
        setAuth({ username, password, accessToken });
        navigate("/doc_dashboard");
        setName("");
        setPassword("");
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server response");
        } else if (err.response?.status === 400 || err.response?.status === 404 ) {
          setErrMsg(
            "Ensure both username and password are correct and try again."
          );
        } else if (err.response?.status === 401) {
          setErrMsg("You are unauthorized to login as a doctor.");
        } else {
          setErrMsg("Login failed");
        }
        errRef.current.focus();
      }
      setLoading(false);
    };
  
    return (
      <>
        {success ? (
          <section className="section">
            <h1>You are logged in!</h1>
          </section>
        ) : (
          <section className="section">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <section className="pt-5 pb-5">
              <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                      <div className="card" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-5">
                          <div className="container pt-4"></div>
  
                          <h2 className="text-uppercase text-center mb-5">
                            Doctor Login
                          </h2>
  
                          <form onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                              <input
                                type="text"
                                id="form3Example1cg"
                                className="form-control form-control-lg"
                                required
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                ref={userRef}
                                autoComplete="off"
                              />
                              <label className="form-label" htmlFor="form3Example1cg">
                                Username
                              </label>
                            </div>
  
                            <div className="form-outline mb-4">
                              <input
                                type="password"
                                id="form3Example4cdg"
                                autoComplete="off"
                                className="form-control form-control-lg"
                                required
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example4cdg"
                              >
                                Password
                              </label>
                            </div>
  
                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                              >
                                {loading ? "logging on..." : "Login"}
                              </button>
                            </div>
  
                            <p className="text-center text-muted mt-5 mb-0">
                              Don't have an account?{" "}
                              <a href="/register" className="fw-bold text-body">
                                <u>Sign Up</u>
                              </a>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}
      </>
    );
  };

export default DoctorLogin