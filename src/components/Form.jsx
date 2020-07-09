import React from 'react'
import './../styles/Form.css'

export default function Form({id, className, formTitle, children, onSubmit}) {
    if(className) className = 'Form ' + className
    else className = 'Form'
    return (
        <>
            {formTitle ? <h1>{formTitle}</h1> : <></>}
            <form onSubmit={onSubmit} id={id} className={className}>
                {children}
            </form>
        </>
    )
}
