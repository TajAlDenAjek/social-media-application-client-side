
import React, { useEffect, useState } from "react";
import "./Settings.css";
import './settings.css'
import { useGetProfileMutation } from "../../features/user/userApiSlice";
import { selectCurrentId } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
const Settings: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email,setEmail]=useState("");
  const [createdAt,setCreatedAt]=useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  
  const handleDeleteAccount = () => {
    // Add logic to handle delete account functionality
  };
  
  const handleUpdate = () => {
    // Add logic to handle update functionality
  };
  
  const [getProfile,{isLoading}]=useGetProfileMutation()
  const id=useSelector(selectCurrentId)
  const GetProfile=async()=>{
    try {
        const result=await getProfile({id})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    GetProfile()
  },[])

  return (
    // full container page
    <div className="settings-container">
      {/* image */}
      <div className="settings-avatar">
        <img src="path/to/circle-image.png" alt="Avatar" />
      </div>
      {/* other info container */}
      <div className="settings-info">
        {/* username */}
        <div className="settings-item">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* email */}
        <div className="settings-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            disabled={true}
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* registered at */}
        <div className="settings-item">
          <label htmlFor="registeredAt">Joined at:</label>
          <input
            type="text"
            id="registeredAt"
            disabled={true}
            value={createdAt}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      
        {/* first name */}
        <div className="settings-item">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* last name */}
        <div className="settings-item">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* gender */}
        <div className="settings-item">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {/* birthday */}
        <div className="settings-item">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        {/* country */}
        <div className="settings-item">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>
      {/* buttons */}
      <div className="settings-actions">
        <button className="settings-delete" onClick={handleDeleteAccount}>
          Delete Account
        </button>
        <button className="settings-update" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Settings;