import React from 'react'

export default function Button({onClick, className, type, val}) {
    return (
        <button onClick={onClick} className={className} type={type}>{val}</button>
    )
}
