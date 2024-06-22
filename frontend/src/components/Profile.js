import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { getDataAxiosPost } from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../store/userSlice";

const initalValue = {
    name: '',
    email: '',
    location: ''
}
function Profile() {
    const [formValue, setFormValue] = useState(initalValue);
    const { userEmail, location, userName } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setFormValue({ ...formValue, email: userEmail, name: userName, location: location });
    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getDataAxiosPost('/user/profile', formValue)
            .then((res) => {
                dispatch(updateUserDetails(formValue));
                navigate('/')
            })
            .catch((err) => {

            })

    }
    return (
        <div className="sub-container">
            <h2>Profile</h2>
            <div className="profile-form">
                <form onSubmit={handleSubmit}>
                    <FormInput label="name" labelText="Name" type="text" value={formValue.name} handleChange={handleChange} />
                    <FormInput label="email" labelText="Email" type="email" value={formValue.email} handleChange={handleChange} isDisabled={true} />
                    <FormInput label="location" labelText="Location" type="text" value={formValue.location} handleChange={handleChange} />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;