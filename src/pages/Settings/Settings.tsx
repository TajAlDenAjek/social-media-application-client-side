import React, { useEffect, useState, useRef } from "react";
import { useGetProfileMutation, useUpdateProfileMutation, useDeleteProfileMutation } from "../../features/user/userApiSlice";
import { selectCurrentId, selectCurrentToken, logOut } from "../../features/auth/authSlice";
import { UserProfile } from "../../features/user/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchImage } from "../../components/SimpleImageFetcher";
import { useNavigate,Link } from "react-router-dom";
import './settings.css'


type ResultProfileType = {
  data: any | UserProfile
} | any

type updateRequest = {
  id: number | null,
  data: any | UserProfile,
  image?: any | File,
}


const Settings: React.FC = () => {

  // Intial User State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '', password: '', email: '',
    createdAt: '', firstName: '', lastName: '',
    gender: "male", birthday: '', country: '',
    picturePath: '', state: undefined
  })

  const navigate = useNavigate()
  // picture and image file when upload
  const [img, setImg] = useState('');
  const [file, setFile] = useState(undefined);

  // refrence to the input behined the image
  const fileInputRef = useRef<React.MutableRefObject<undefined> | any>(null);

  // error messages
  const [errMsg, setErrMsg] = useState<string | string[] | null>('')

  // api functions (get,patch,delete)
  const [getProfile, { isLoading: isGettingLoading }] = useGetProfileMutation()
  const [updateProfile, { isLoading: isUpdatingLoading }] = useUpdateProfileMutation()
  const [deleteProfile, { }] = useDeleteProfileMutation()

  // current user id and token
  const id = useSelector(selectCurrentId)
  const token = useSelector(selectCurrentToken)

  // here fire the actions using dispatch 
  const dispatch = useDispatch()

  // handle any state change when typing something new or selecting some values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any): any => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  // upload image functionality 
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const file = event.target.files[0];
    setFile(file)
    setImg(URL.createObjectURL(file))
  };
  // handle click and update the refrence 
  const uploadImage = () => {
    fileInputRef.current.click();
  };

  // get profile info from the backend server
  const GetProfile = async () => {
    try {
      // query request 
      const result: ResultProfileType = await getProfile({ id })
      let data: ResultProfileType = result.data

      // set the recevied values 
      Object.keys(data).map((attribute: any) => {
        // to keep controlling the html values 
        if (data[attribute] === null)
          data = { ...data, [attribute]: undefined }
        // show only the year month and day from Date values
        if (attribute === 'createdAt' || (attribute === 'birthday' && data[attribute]))
          data = { ...data, [attribute]: data[attribute].slice(0, 10) }
        // update new state
        setUserProfile(prevState => ({
          ...prevState,                 // rest values 
          [attribute]: data[attribute], // new value to update
        }))
      })
    } catch (error) { }
  }
  // update query request
  const handleUpdate = async () => {
    // alert confirmation 
    if (window.confirm('Are you sure you want to Update ?')) {
      setErrMsg([]);
      try {
        // set basic info and id 
        let data: UserProfile | string = userProfile
        const req: updateRequest = { id, data }
        // set new image if exist
        if (file) {
          req.image = file
        }
        // stringify as required from backend
        req.data = JSON.stringify(req.data)
        // request 
        await updateProfile(req).unwrap()
        // refresh when success
        window.location.reload();
      } catch (error: any) {
        // handleing error message from backend api
        //init 
        setErrMsg([]);
        let oneError: Boolean = false;
        const errors = error.data;
        let errorText: string[] = [];

        // loop over errors
        for (const key in errors) {
          if (Object.hasOwnProperty.call(errors, key)) {
            errorText.push(errors[key])
            oneError = true
          }
        }
        // setting new error message
        setErrMsg(errorText)
        // default message 
        if (!oneError)
          setErrMsg('Something Went Wrong !!')
      }
    }
  };

  // delete query request
  const handleDeleteAccount = async () => {
    // as the update use alert confirmation
    if (window.confirm('Are you sure you want to Delete ?')) {
      try {
        await deleteProfile(id)
        dispatch(logOut())
      } catch (error) { }
    }
  };

  // first get the data from the backend
  useEffect(() => {
    GetProfile()
  }, [])
  // after that set the image depending on the data
  useEffect(() => {
    if (userProfile.picturePath)
      fetchImage(userProfile.picturePath, setImg, token)
    else if (userProfile.picturePath === undefined)
      fetchImage('default.png', setImg, token)
  }, [userProfile.picturePath])

  const handleShowMyProfile = () => {
    navigate(`/userProfile/${id}`)
  };
  const content = (
    isGettingLoading
      ?
      <div className="settings-container">
        <h1>Loading ...</h1>
      </div>
      :
      // full container page
      <div className="settings-container">
        {/* image */}
        <div className="settings-avatar">
          <img src={img} alt="icons" onClick={uploadImage} style={{ cursor: "pointer" }} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
        <button className="settings-showMyProfile" onClick={handleShowMyProfile}>
          Show My Profile
        </button>
        {/* other info container */}
        <div className="settings-info">
          {/* username */}
          <div className="settings-item">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={userProfile.username}
              onChange={handleChange}
            />
          </div>
          {/* password */}
          <div className="settings-item">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={userProfile.password}
              onChange={handleChange}
            />
          </div>
          {/* email */}
          <div className="settings-item">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              disabled={true}
              value={userProfile.email}
            />
          </div>
          {/* registered at */}
          <div className="settings-item">
            <label htmlFor="registeredAt">Joined at:</label>
            <input
              type="text"
              name="createdAt"
              id="registeredAt"
              disabled={true}
              value={userProfile.createdAt}
            />
          </div>
          {/* first name */}
          <div className="settings-item">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstname"
              value={userProfile.firstName}
              onChange={handleChange}
            />
          </div>
          {/* last name */}
          <div className="settings-item">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastname"
              value={userProfile.lastName}
              onChange={handleChange}
            />
          </div>
          {/* gender */}
          <div className="settings-item">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={userProfile.gender}
              onChange={handleChange}
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
              name="birthday"
              id="birthday"
              value={userProfile.birthday}
              onChange={handleChange}
            />
          </div>
          {/* country */}
          <div className="settings-item">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              name="country"
              id="country"
              value={userProfile.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="settings-actions">
          {errMsg && <div className="error-message">{errMsg}</div>}
        </div>
        {/* buttons */}
        <div className="settings-actions">
          <button className="settings-delete settings-delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
          <button className="settings-update settings-update-btn" onClick={handleUpdate}>
            {isUpdatingLoading ? 'Updating ...' : 'Update Account'}
          </button>
        </div>
      </div>
  )
  return content;
};

export default Settings;