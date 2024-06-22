import React from "react";

function FormSelect({ label, labelText, value, handleChange, optionList }) {
   
    return (
        <div className="form-row">
            <label htmlFor={label} className="form-label">{labelText}</label>
            <select name={label} value={value} onChange={handleChange} className="form-select">
                {
                    optionList.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item}</option>
                        )

                    })
                }
            </select>
        </div>
    )
}

export default FormSelect;