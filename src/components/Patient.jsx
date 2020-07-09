import React from 'react'
import './../styles/Patient.css'

export default function Patient({children, id}) {
    return (
        <div id={id} className='Patient'>
            {children}
        </div>
    )
}
