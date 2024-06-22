import React from "react";
import { useDispatch } from "react-redux";
import { updateIsDelete, updateIsEdit, updateJobId } from "../store/jobSlice";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../api/apiHandler";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { IoIosCheckmarkCircleOutline } from "react-icons/io"


function Card({ key, jobData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateJobId(jobData._id));
    dispatch(updateIsEdit(true));
    navigate('/createJob')
  }

  const handleDelete = (e) => {
    dispatch(updateIsDelete(true));
    const id = jobData._id;
    deleteData(`/job/deleteJob/${id}`).then((res) => {
      dispatch(updateIsDelete(false));
    })
  }


  return (
    <div className="card">
      <header>
        <div className="job-icon">{jobData?.companyName?.split("")[0]}</div>
        <div className="info">
          <h5>{jobData.position}</h5>
          <p>{jobData.companyName}</p>
        </div>
      </header>
      <hr></hr>
      <div className="content">
        <div className="item">
          <span className="icon"><FaBriefcase/></span>
          <span className="value">{jobData.jobType}</span>
        </div>
        <div className="item">
          <span className="icon"><FaLocationArrow/></span>
          <span className="value">{jobData.location}</span>
        </div>

        <div className="item">
          <span className="icon"><IoIosCheckmarkCircleOutline/></span>
          <span className="value">{jobData.status}</span>
        </div>
      </div>
      <footer>
        <button type="button" className="edit-btn" onClick={(e) => handleEdit(e)}>Edit</button>
        <button type="button" className="delete-btn" onClick={(e) => handleDelete(e)}>Delete</button>
      </footer>
    </div>
  )
}

export default Card;