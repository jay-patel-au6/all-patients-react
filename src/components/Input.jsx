import React from 'react'

export default function Input({id, type, name, labelVal, required, onChange, inputVal}) {
    return (
        <div className='form-group'>
            <label htmlFor={id} >{labelVal} {required ? <span style={{color: 'red'}}>*</span> : <></>}</label>
            <input required={required} id={id} type={type} className='form-control' name={name} onChange={onChange} value={inputVal || ''}></input>
        </div>
    )
}
