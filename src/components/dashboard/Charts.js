import React, { useState, useEffect, useRef, useContext } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import AuthContext from "../../context/AuthProvider";
import axios from 'axios';
 
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const DOC_APPT_URL = "https://absh.onrender.com/api/v1/appointment/get_a_doctor_appointments/";
const Charts = () => {
    const { auth } = useContext(AuthContext);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const getDocAppointments = () => {
    axios.get(DOC_APPT_URL, {
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
    getDocAppointments();
  }, []);

  const options = {
    title: {
      text: "Total Appointments",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Pending", y: repo.pending },
          { label: "Completed", y: repo.completed },
        ]
      }
    ]
  };

  return (
    <div className="container">
      <section>
        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <h5 className="text-uppercase">Welcome <span className='text-capitalize'>{auth.username}</span>🎉</h5>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <h2 className="h1 mb-0 me-4">{repo.pending}</h2>
                    </div>
                    <div>
                      <h4>Pending Appointments</h4>
                      <p className="mb-0">Your pending appointments</p>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="card mb-4">
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
                  
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <h2 className="h1 mb-0 me-4">0</h2>
                    </div>
                    <div>
                      <h4>Cancelled Appointments</h4>
                      <p className="mb-0">Your cancelled appointments</p>
                    </div>
                    
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
                      <CanvasJSChart options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  };  

export default Charts;