import React, { useState, useRef, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";


const DOCTOR_URL = "https://absh.onrender.com/api/v1/staff/get_all_doctors/";
const APPOINTMENT_URL = "https://absh.onrender.com/api/v1/appointment/book_appointment/";

function Appointment() {
  const { auth } = useContext(AuthContext);

  const errRef = useRef();

  const [scheduled_time, setscheduled_time] = useState(new Date());
  const [doctor, setDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [appointment_reason, setappointment_reason] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(DOCTOR_URL);
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error.response || error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [
    doctor,
    scheduled_time,
    appointment_reason
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v2 = doctor;
    const v3 = scheduled_time.toISOString(); // Convert to ISO 8601 format
    const v4 = appointment_reason;
  
    if (!v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(
        APPOINTMENT_URL,
        {
          doctor,
          scheduled_time: v3,
          appointment_reason,
        },
        {
          headers: { "Content-Type": "application/json" ,
          Authorization: `Token ${auth.accessToken}`,
        }
      }
      );
  
      setLoading(false);
      setDoctor("");
      setappointment_reason("");
      setscheduled_time("");
      Swal.fire(
        "Good job!",
        "You have successfully booked an appointment. The Doctor will reach out soon.",
        "success"
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg(
          "An error occurred somewhere. Please try again later."
        );
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Appointment booking failed");
      }
      errRef.current.focus();
    }
  
    setLoading(false);
  };
  

  return (
    <>
      <section className="section">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="container px-4 py-4">
          <div className="col-12 mt-3 mb-4">
            <h5 className="text-uppercase">Welcome <span className='text-capitalize'>{auth.username}</span>🎉</h5>
            <p>Book a new appointment</p>
          </div>
          <div className="card">
            <div className="card-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="inputDoctor" className="form-label">
                    Select Doctor
                  </label>
                  <select
                    id="inputDoctor"
                    className="form-select"
                    value={doctor}
                    onChange={(e) => setDoctor(parseInt(e.target.value))}
                  >
                    <option value="">Choose...</option>
                    {doctors.map((doctor) => (
                      <option value={doctor.id} key={doctor.id}>
                        {doctor.first_name + " " + doctor.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label for="inputDate" class="form-label">
                    Select Date and Time
                  </label>{" "}
                  <br />
                  <DatePicker
                    selected={scheduled_time}
                    onChange={(date) => setscheduled_time(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm"
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputappointment_reason" className="form-label">
                    Reason for Visit
                  </label>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={appointment_reason}
                    onChange={(e) => setappointment_reason(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? "Booking..." : "Book appointment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Appointment;
