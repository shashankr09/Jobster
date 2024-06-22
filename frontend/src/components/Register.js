import React, { useState } from "react";
import FormInput from '../common/FormInput';
import { getDataAxiosPost } from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { toast } from 'react-toastify';
import { sha256 } from "js-sha256";

const initalValue = {
    email: '',
    password: '',
    confirmPassword: ''
}

function Register() {

    const [formValue, setFormValue] = useState(initalValue);
    const [isRegistered, setIsRegistered] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formValue;
        if (!email || !password || (!isRegistered && !confirmPassword)) {
            toast.error('Please Fill Out All Fields');
        }
        else if (!isRegistered && (password !== confirmPassword)) {
            toast.error('Password mismatch')
        }
        else {
            let payload = {
                email: formValue.email,
                password: sha256(formValue.password + formValue.email.split('@')[0])
            }
            let api = isRegistered ? "/user/login" : "/user/register";
            getDataAxiosPost(api, payload)
                .then((response) => {
                    if (isRegistered) {
                        dispatch(loginSuccess(response.data))
                        toast.success('Welcome to Jobster');
                        navigate('/');

                    }
                    else {
                        setIsRegistered(true);
                    }


                }).catch((err) => {
                    toast.error('Something went wrong')
                })
        }
    }


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormInput label="email" labelText="Email" type="email" value={formValue.email} handleChange={handleChange} />
            <FormInput label="password" labelText="Password" type="password" value={formValue.password} handleChange={handleChange} />
            {
                !isRegistered && <FormInput label="confirmPassword" labelText="Confirm Password" type="password" value={formValue.confirmPassword} handleChange={handleChange} />
            }
            <button type="submit" className="btn">{!isRegistered ? 'Register' : 'Login'}</button>

            <div>
                <span>{isRegistered ? `Don't have an account` : 'Already have an account'}?</span>
                <button type="button" className="userFormButton" onClick={(e) => setIsRegistered(!isRegistered)}>{isRegistered ? 'Register' : 'Login'}</button>
            </div>
        </form>
    )
}

export default Register;