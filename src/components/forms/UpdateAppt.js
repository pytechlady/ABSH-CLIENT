import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';


const UpdateAppt = () => {
    const { appointment_id } = useParams();
    const errRef = useRef();
    const [scheduled_time, setTime] = useState(new Date());
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchAppointment = async () => {
        try {
          const response = await axios.get(`https://absh.onrender.com/api/v1/appointment/get_appointment?id=${appointment_id}`);
          const appointment = response.data.data;
          const scheduledTime = new Date(appointment.scheduled_time);
          setTime(scheduledTime);
        } catch (error) {
          setErrMsg("Appointment not found");
        }
      };
      fetchAppointment();
    }, [appointment_id]); 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await axios.patch(
          `https://absh.onrender.com/api/v1/appointment/update_appointment/?id=${appointment_id}`,
          {
            scheduled_time: scheduled_time.toISOString(),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setLoading(false);
        Swal.fire(
          "Your Appointment has been updated successfully. Thank you!",
        );
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("There was an error updating your appointment. Please try again");
        } else {
          setErrMsg("Appointment update failed. Please try again");
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
          <p>Update appointment</p>
        </div>
        <div className="card">
          <div className="card-body">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label for="inputDate" class="form-label">
                  Select Date and Time
                </label>{" "}
                <br />
                <DatePicker
                  selected={scheduled_time}
                  onChange={(date) => setTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={60}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm"
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? "Updating..." : "Update appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default UpdateAppt