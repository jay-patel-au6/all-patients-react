import React from 'react'

export default function Select({id, name, labelVal, required, onChange, inputVal, options}) {
    return (
        <div className='form-group'>
            <label htmlFor={id} >{labelVal} {required ? <span style={{color: 'red'}}>*</span> : <></>}</label>
            <select required={required} id={id} className='form-control' name={name} onChange={onChange} value={inputVal || ''}>
            {options.map(option => <option key={Math.random()} disabled={!option.length} value={option.toLowerCase()}>{option}</option>)}
            </select>
        </div>
    )
}
