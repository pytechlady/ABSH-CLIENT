import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const USER_PROFILE_URL =
  "https://absh.onrender.com/api/v1/users/update_user_details/";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  const errRef = useRef();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [blood_group, setBloodgroup] = useState("");
  const [gender, setGender] = useState("");
  const [genotype, setGenotype] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://absh.onrender.com/api/v1/users/get_a_patient?id=${auth.user_id}`);
        const userDetails = response.data.data;
        setFirstName(userDetails.first_name || "");
        setLastName(userDetails.last_name || "");
        setAge(userDetails.age || "");
        setAddress(userDetails.address || "");
        setMaritalStatus(userDetails.marital_status || "");
        setEmail(userDetails.email || "");
        setPhone(userDetails.phone || "");
        setOccupation(userDetails.occupation || "");
        setBloodgroup(userDetails.blood_group || "");
        setGender(userDetails.gender || "");
        setGenotype(userDetails.genotype || "");
      } catch (error) {
        setErrMsg("Error fetching user details");
      }
    };

    fetchUserDetails();
  }, [auth.accessToken]); // Re-run the effect when the access token changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        USER_PROFILE_URL,
        {
          first_name,
          last_name,
          age,
          address,
          marital_status,
          email,
          occupation,
          blood_group,
          gender,
          genotype,
          phone,
        },
        {
          headers: { "Content-Type": "application/json", Authorization: `Token ${auth.accessToken}` },
        }
      );
      setLoading(false);
      Swal.fire(
        "Your profile has been updated. Thank you!",
      );
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("There was an error saving your details. Please try again");
      } else {
        setErrMsg("Profile update failed. Please try again");
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
          <section className="pt-5 pb-4">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div className="card" style={{ borderRadius: "15px" }}>
                      <div className="card-body p-5">
                        <div className="container pt-4"></div>

                        <h2 className="text-uppercase text-center mb-5">
                          Update Profile
                        </h2>

                        <form onSubmit={handleSubmit}>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example1cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setFirstName(e.target.value)}
                              value={first_name}
                              aria-describedby="uidnote"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1cg"
                            >
                              First Name
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example2cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setLastName(e.target.value)}
                              value={last_name}
                              aria-describedby="uidnote"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example2cg"
                            >
                              Last Name
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example3cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setAge(e.target.value)}
                              value={age}
                              aria-describedby="uidnote"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3cg"
                            >
                              Age
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              id="form3Example6cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example6cg"
                            >
                              Email Address
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example5cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address}
                              aria-describedby="uidnote"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example5cg"
                            >
                              Address
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="tel"
                              id="form3Example4cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setPhone(e.target.value)}
                              value={phone}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cg"
                            >
                              Phone
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form3Example7cg"
                              className="form-control form-control-lg"
                              autoComplete="off"
                              onChange={(e) => setOccupation(e.target.value)}
                              value={occupation}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example7cg"
                            >
                              Occupation
                            </label>
                          </div>
                          <div className="form-outline mb-4">          
                            <select
                              id="inputGender"
                              className="form-select"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Choose...</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Transgender">Transgender</option>
                              <option value="Gender neutral">
                                Gender neutral
                              </option>
                              <option value="Non-binary">Non-binary</option>
                            </select>
                            <label htmlFor="inputGender" className="form-label">
                              Select Gender
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                           
                            <select
                              id="inputBloodgroup"
                              className="form-select"
                              value={blood_group}
                              onChange={(e) => setBloodgroup(e.target.value)}
                            >
                              <option value="">Choose...</option>
                              <option value="O+">O+</option>
                              <option value="0-">0-</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                            <label htmlFor="inputGender" className="form-label">
                              Select Bloodgroup
                            </label>
                          </div>
                          <div className="form-outline mb-4">

                            <select
                              id="inputGenotype"
                              className="form-select"
                              value={genotype}
                              onChange={(e) => setGenotype(e.target.value)}
                            >
                              <option value="">Choose...</option>
                              <option value="AA">AA</option>
                              <option value="AC">AC</option>
                              <option value="AS">AS</option>
                              <option value="CC">CC</option>
                              <option value="SC">SC</option>
                              <option value="SS">SS</option>
                            </select>
                            <label
                              htmlFor="inputGenotype"
                              className="form-label"
                            >
                              Genotype
                            </label>
                          </div>
                          <div className="form-outline mb-4">
                           
                            <select
                              id="inputMaritalStatus"
                              className="form-select"
                              value={marital_status}
                              onChange={(e) => setMaritalStatus(e.target.value)}
                            >
                              <option value="">Choose...</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widowed">Widowed</option>
                              <option value="Divorced">Divorced</option>
                              <option value="Separated">Separated</option>
                              <option value="Registered partnership">
                                Registered partnership
                              </option>
                            </select>
                            <label
                              htmlFor="inputMaritalStatus"
                              className="form-label"
                            >
                              Marital Status
                            </label>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                                disabled={loading}
                              type="submit"
                              className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
                            >
                              Update Profile
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

    </>
  );
      };

export default Profile;
