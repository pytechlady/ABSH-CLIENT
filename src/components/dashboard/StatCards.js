import React, { useContext, useRef, useState, useEffect } from 'react'
import AuthContext from "../../context/AuthProvider";
import axios from 'axios';


const USER_APPT_URL = "https://absh.onrender.com/api/v1/appointment/get_a_patient_appointments/"
const StatCards = () => {

  const { auth } = useContext(AuthContext);

  const errRef = useRef();

  // const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const getAppointments = () => {
    axios.get(USER_APPT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${auth.accessToken}`,
        },
      })
      .then((response) => {
        const MyData = response.data;
        setRepo(MyData);
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No server response");
        } else if (err.response?.status === 400) {
          setErrMsg(
            "Message failed to fetch appointments. Please check your internet connection and try again"
          );
        } else if (err.response?.status === 401) {
          setErrMsg("You are not authorized to view appointments");
        } else {
          setErrMsg("Something went wrong. Please try again");
        }
        errRef.current.focus();
      });
  };
  useEffect(() => {
    getAppointments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
  <section>
    <div className="row">
      <div className="col-12 mt-3 mb-1">
        <h5 className="text-uppercase">Welcome <span className='text-capitalize'>{auth.username}</span>🎉</h5>
        <p>Your health is important to us</p>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between p-md-1">
              <div className="d-flex flex-row">
                <div className="align-self-center">
                  <i className="fas fa-pencil-alt text-info fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Total Appointments</h4>
                  <p className="mb-0">Your total appointments</p>
                </div>
              </div>
              <div className="align-self-center">
                <h2 className="h1 mb-0">{repo.count}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between p-md-1">
              <div className="d-flex flex-row">
                <div className="align-self-center">
                  <i className="far fa-comment-alt text-warning fa-3x me-4"></i>
                </div>
                <div>
                  <h4>Pending Appointments</h4>
                  <p className="mb-0">Your pending appointments</p>
                </div>
              </div>
              <div className="align-self-center">
                <h2 className="h1 mb-0">{repo.pending}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between p-md-1">
              <div className="d-flex flex-row">
                <div className="align-self-center">
                  <h2 className="h1 mb-0 me-4">{repo.completed}</h2>
                </div>
                <div>
                  <h4>Completed Appointments</h4>
                  <p className="mb-0">Your completed appointments</p>
                </div>
              </div>
              <div className="align-self-center">
                <i className="far fa-heart text-danger fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-md-12 mb-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between p-md-1">
              <div className="d-flex flex-row">
                <div className="align-self-center">
                  <h2 className="h1 mb-0 me-4">0</h2>
                </div>
                <div>
                  <h4>Cancelled Appointment</h4>
                  <p className="mb-0">Your cancelled appointment</p>
                </div>
              </div>
              <div className="align-self-center">
                <i className="fas fa-wallet text-success fa-3x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</div>
  )
}

export default StatCards