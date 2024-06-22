import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import { getData, getDataAxiosPost } from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateIsEdit } from "../store/jobSlice";
import { toast } from "react-toastify";


const status = ['Applied', 'Pending', 'Completed'];
const jobType = ['Remote', 'Work from Office', 'Hybrid'];

const initalValue = {
    position: '',
    companyName: '',
    location: '',
    status: status[0],
    jobType: jobType[0]
}

function CreateJob() {

    const [formValue, setFormValue] = useState(initalValue);
    const navigate=useNavigate();
    const {isEdit,jobId}=useSelector(state=>state.job);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { position, companyName, location, status, jobType } = formValue;

        if (!position || !companyName || !location || !status || !jobType) {
            alert("Please Fill out the Form");
        }
        else {
            let url;
            if(isEdit){
                url=`/job/editJob/${jobId}`;
            }
            else{
                url=`/job/createJob`
            }
            getDataAxiosPost(url, formValue).then((response) => {
             
                toast.success('Job has been successfully submitted');
                navigate('/jobs')

            })
                .catch((err) => {

                })
        }
    }
const dispatch=useDispatch();
    useEffect(()=>{
        if(isEdit){
            getData(`/job/editJob/${jobId}`, formValue).then((response) => {
                setFormValue(response.data);
            })
                .catch((err) => {

                })
        }
        return(()=>{
            dispatch(updateIsEdit(false));
        })
    },[isEdit])



    const handleClear = () => {
        setFormValue(initalValue);
    }
    return (
        <div className="newJob-container">
            <h2>Add Job</h2>
            <div className="job">
                <form onSubmit={handleSubmit}>
                    <FormInput label="position" labelText="Position" type="text" value={formValue.position} handleChange={handleChange} />
                    <FormInput label="companyName" labelText="Company" type="text" value={formValue.companyName} handleChange={handleChange} />
                    <FormInput label="location" labelText="Location" type="text" value={formValue.location} handleChange={handleChange} />
                    <FormSelect label="status" labelText="Status" value={formValue.status} handleChange={handleChange} optionList={status} />
                    <FormSelect label="jobType" labelText="JobType" value={formValue.jobType} handleChange={handleChange} optionList={jobType} />
                    <div className="button-container">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" onClick={handleClear} className="clear-btn">Clear</button>
                    </div>
                  
                   
                   
                </form>
            </div>
        </div>
    )
}

export default CreateJob;