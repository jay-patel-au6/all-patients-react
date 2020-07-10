import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Patient from './../components/Patient.jsx'
import Button from './../components/Button.jsx'

import './../styles/Home.css'

export default class Home extends Component {

    handleAdmittedList() {
        if(this.props.admitted) {

            // sorting by time
            this.props.admitted.sort((a, b) => {
                if(new Date(a.admittedOn).getTime() - new Date(b.admittedOn).getTime() > 1) return -1
                else return 1
            })

            return(
                <>
                    <header className='header-flex'>
                        <h1>List of admitted patients</h1>
                        
                        <Link to='/AdmitNew'><Button className='btn btn-primary' val='Admit a new patient'/></Link>
                    </header>
                    <div className='admittedList'>
                        {this.props.admitted.map(
                            patient => {
                                return (
                                    <Patient key={patient._id} id={patient._id}>
                                        <h3>Name: {patient.name}</h3>
                                        {patient.admittedOn ? <p>Admitted on {(new Date(patient.admittedOn)).toDateString() + ' at ' + (new Date(patient.admittedOn)).toLocaleTimeString()}</p> : <></>}
                                        {patient.disease ? <h4>Disease: {patient.disease}</h4> : <></>}
                                        {patient.description ? <p>Description: {patient.description}</p> : <></>}
                                        <Link to={'/updateStatus/' + patient._id + '/' + patient.admittedOn}><Button className='btn btn-secondary' val='Update'></Button></Link>
                                    </Patient>
                                )
                            }
                        )}    
                    </div>
                </>
            )}
        else return <p>Loading...</p>
    }

    render() {
        return (
            <div className='Home'>
                {this.handleAdmittedList()}
            </div>
        )
    }
}
