import React from "react";
import './SelectField.scss'
const index = ({ value, label, onChange, name, error, addselect, disabled, options, selected }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor="input-field" className="lblInput">{label}</label>}
            <select
                className={`form-select ${error && 'was-validated1'}`}
                aria-label="Default select example"
                onChange={onChange}
                value={selected}
                name={name}
                disabled={disabled}
                defaultValue={undefined} >
                {options ?
                    <>
                        {addselect &&
                            <option value={undefined} selected  disabled >
                                Select
                            </option>
                        }
                        {options.map((option, i) => {
                            return (
                                <option value={option.value ? option.value : option} key={option.value || i} >
                                    {option.name ? option.name : option}
                                </option>)
                        })}
                    </>
                    :
                    <> </>}
            </select>
            {error ? <span className='error'>{error}</span> : null}
        </div>
    );
};

export default index;