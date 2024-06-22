import React from "react";


function FormInput({ label, labelText, type, value, handleChange,isDisabled }) {

    return (
        <div className="form-row">
            <label htmlFor={label} className="form-label">{labelText}</label>
            <input type={type} name={label} className="form-input" value={value} onChange={handleChange} disabled={isDisabled}></input>
        </div>
    )
}


export default FormInput;