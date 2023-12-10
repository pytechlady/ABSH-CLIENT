import React, { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DOC_APPT_URL =
  "https://absh.onrender.com/api/v1/appointment/get_a_doctor_appointments/";
const DocAppt = () => {
  const { auth } = useContext(AuthContext);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [repo, setRepo] = useState([]);
  const [patientNames, setPatientNames] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, []);

  const getAppointments = () => {
    axios
      .get(DOC_APPT_URL, {
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

  const fetchUserNames = async () => {
    const namesPromises = repo.map(async (item) => {
      try {
        const response = await axios.get(
          `https://absh.onrender.com/api/v1/users/get_a_patient?id=${item.user}`
        );

        const userData = response?.data?.data;
        return `${userData.first_name} ${userData.last_name}`;
      } catch (error) {
        console.error("Error fetching patient name:", error);
        return "Unknown Patient";
      }
    });

    Promise.all(namesPromises)
      .then((names) => setPatientNames(names))
      .catch((error) => console.error("Error fetching patient names:", error));
  };

  useEffect(() => {
    if (repo.length > 0) {
      fetchUserNames();
    }
  }, [repo]);

  const formatScheduledTime = (utcTime) => {
    const localTime = new Date(utcTime).toLocaleString(); // Convert to local time
    return localTime;
  };

  const handleEditButtonClick = (appointmentId) => {
    navigate(`/update-appointments/${appointmentId}`);
  };

  return (
    <div className="container">
      <div className="col-12 mt-3 mb-4">
        <h5 className="text-uppercase">
          Welcome <span className="text-capitalize">{auth.username}</span>🎉
        </h5>
        <p>Below are all appointment booked by patients</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Patient Name</th>
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
              <td>{patientNames[index]}</td>
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

export default DocAppt;
