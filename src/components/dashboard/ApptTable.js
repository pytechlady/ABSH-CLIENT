import React, { useContext, useRef, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_APPT_URL =
  "https://absh.onrender.com/api/v1/appointment/get_a_patient_appointments/";

const ApptTable = () => {
  const { auth } = useContext(AuthContext);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [repo, setRepo] = useState([]);
  const [doctorNames, setDoctorNames] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, []);

  const getAppointments = () => {
    axios
      .get(USER_APPT_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${auth.accessToken}`,
        },
      })
      .then((response) => {
        const MyData = response.data.data;
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

  const fetchDoctorNames = async () => {
    const namesPromises = repo.map(async (item) => {
      try {
        const response = await axios.get(
          `https://absh.onrender.com/api/v1/staff/get_doctor?id=${item.doctor}`
        );
        const doctorData = response.data.data;
        return `${doctorData.first_name} ${doctorData.last_name}`;
      } catch (error) {
        console.error("Error fetching doctor name:", error);
        return "Unknown Doctor";
      }
    });

    Promise.all(namesPromises)
      .then((names) => setDoctorNames(names))
      .catch((error) => console.error("Error fetching doctor names:", error));
  };

  useEffect(() => {
    if (repo.length > 0) {
      fetchDoctorNames();
    }
  }, [repo]);

  const formatScheduledTime = (utcTime) => {
    const localTime = new Date(utcTime).toLocaleString(); // Convert to local time
    return localTime;
  };

  const handleEditButtonClick = (appointmentId) => {
    navigate(`/update-appointment/${appointmentId}`);
  };

  return (
    <div className="container">
      <div className="col-12 mt-3 mb-4">
        <h5 className="text-uppercase">
          Welcome <span className="text-capitalize">{auth.username}</span>🎉
        </h5>
        <p>Below are all your already booked appointment</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Doctor</th>
            <th scope="col">Scheduled Date</th>
            <th scope="col">Reason for visit</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {repo.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{doctorNames[index]}</td>
              <td>{formatScheduledTime(item.scheduled_time)}</td>
              <td>{item.appointment_reason}</td>
              <td>{item.is_completed ? "Completed" : "Pending"}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditButtonClick(item.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApptTable;
