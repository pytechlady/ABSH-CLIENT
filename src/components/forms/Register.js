import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import './forms.css';

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[^a-zA-Z0-9]).{8,24}$/;


const REGISTER_URL = "https://absh.onrender.com/api/v1/users/register_patients/";
const Register = () => {
  const UserRef = useRef();
  const PhoneRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validpassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    UserRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = phone;
    setValidPhone(result);
}, [phone])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(username);
    const v2 = phone;
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, phone, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/login");
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username already taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
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
          <section className="pt-5 pb-4">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: "15px" }}>
                      <div className="card-body p-5">
                        <div className="container pt-4"></div>

                        <h2 className="text-uppercase text-center mb-5">
                          Create an account
                        </h2>

                        <form onSubmit={handleSubmit}>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example1cg"
                              className="form-control form-control-lg"
                              required
                              placeholder="Enter username"
                              ref={UserRef}
                              autoComplete="off"
                              onChange={(e) => setUsername(e.target.value)}
                              value={username}
                              aria-describedby="uidnote"
                              onFocus={() => setUserFocus(true)}
                              onBlur={() => setUserFocus(false)}
                            />
                            <label className="form-label" htmlFor="form3Example1cg">
                              Username
                              <span className={validName ? "valid" : "hide"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validName || !username ? "hide" : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                            </label>
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                         <FontAwesomeIcon icon={faInfoCircle} />
                         Your username should be a minimum of 3 and maximum of 24 characters
                     </p>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="tel"
                              id="form3Example4cg"
                              className="form-control form-control-lg"
                              required
                              placeholder="Enter phone number"
                              ref={PhoneRef}
                              autoComplete="off"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                              onFocus={() => setPhoneFocus(true)}
                              onBlur={() => setPhoneFocus(false)}
                            />
                            <label className="form-label" htmlFor="form3Example4cg">
                              Phone
                              <span className={validPhone ? "valid" : "hide"}>
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                              <span
                                className={
                                  validPhone || !phone ? "hide" : "invalid"
                                }
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </span>
                            </label>
                            <p id="uidnote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                         <FontAwesomeIcon icon={faInfoCircle} />
                         Please use a valid phone number
                     </p>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form3Example4cdg"
                              className="form-control form-control-lg"
                              required
                              placeholder="Enter password"
                              autoComplete="off"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              aria-invalid={validpassword ? "false" : "true"}
                              aria-describedby="pwdnote"
                              onFocus={() => setPasswordFocus(true)}
                              onBlur={() => setPasswordFocus(false)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cdg"
                            >
                              Password
                              <span
                                className={validpassword ? "valid" : "hide"}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                              <span
                                className={
                                  validpassword || !password
                                    ? "hide"
                                    : "invalid"
                                }
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </span>
                            </label>
                            <p
                              id="pwdnote"
                              className={
                                passwordFocus && !validpassword
                                  ? "instructions"
                                  : "offscreen"
                              }
                            >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              8 to 24 characters. <br />
                              Must include lowercase letters, a number and
                              special characters. <br />
                            </p>
                          </div>

                          <div className="form-check d-flex justify-content-center mb-5">
                            <input
                              className="form-check-input me-2"
                              type="checkbox"
                              value=""
                              id="form2Example3cg"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="form2Example3g"
                            >
                              I agree all statements in{" "}
                              <a href="#!" className="text-body">
                                <u>Terms of service</u>
                              </a>
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              disabled={!validName || !validpassword || !validPhone ? true : false}
                              type="submit"
                              className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                            >
                              Register
                            </button>
                          </div>

                          <p className="text-center text-muted mt-5 mb-0">
                            Have already an account?{" "}
                            <a href="/login" className="fw-bold text-body">
                              <u>Login here</u>
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

export default Register;
