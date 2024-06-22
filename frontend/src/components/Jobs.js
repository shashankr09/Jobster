import React, { useEffect, useState } from "react";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";
import useDebounce from "../hooks/useDebounce";
import { getData } from "../api/apiHandler";
import Card from "../common/Card";
import { useSelector } from "react-redux";


const status = ['Applied', 'Pending', 'Completed'];
const jobType = ['Remote', 'Work from Office', 'Hybrid'];

const initalValue = {
    status: status[0],
    jobType: jobType[0]

}

function Jobs() {

    const [formValue, setFormValue] = useState(initalValue);
    const [search, setSearch] = useState('');
    const [response, setResponse] = useState([]);
    const isDelete = useSelector(state => state.job.isDelete);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }

    const debounce = useDebounce(search, 500);

    useEffect(() => {
        let url = `/job/getJobs?search=${search}&status=${formValue.status}&jobType=${formValue.jobType}`;
        if (!isDelete) {
            getData(url).then((res => {
                setResponse(res.data.response);
            }))
                .catch((err) => {

                })
        }
    }, [debounce, formValue, isDelete]);
    return (
        <div className="job-container">
            <div className="sub-container">
                <h2>Filter Jobs</h2>
                <div className="job-form">
                    <FormInput label="search" labelText="Search" type="text" value={search} handleChange={(e) => setSearch(e.target.value)} />
                    <FormSelect label="status" labelText="Status" value={formValue.status} handleChange={handleChange} optionList={status} />
                    <FormSelect label="jobType" labelText="JobType" value={formValue.jobType} handleChange={handleChange} optionList={jobType} />
                    <button type="button">Clear</button>
                </div>

            </div>
            <div className="jobs-content">
                <div>{
                    response.length > 0 &&
                    <h2>Total Jobs : {response.length}</h2>
                }</div>
                <div className="content">
                    {
                        response.length === 0 ? <span>No Jobs Available</span> :



                            response.map((item, index) => {
                                return <Card key={index} jobData={item} />
                            })



                    }

                </div>
            </div>


        </div>

    )
}

export default Jobs;