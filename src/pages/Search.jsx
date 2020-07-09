import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import Form from './../components/Form.jsx'
import Input from './../components/Input.jsx'
import Button from './../components/Button.jsx'
import Patient from './../components/Patient.jsx'

import './../styles/Search.css'

export default withRouter(class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResult: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.props.history.push('/search')    // path to redirect after form submission

        console.log(this.state.search, 'searching')

        let fetched = await fetch(`${this.props.server}/search?name=${this.state.search}`)
        let searchedPatients = await fetched.json()

        console.log(searchedPatients)
        
        if(searchedPatients.length) this.setState({searchResult: searchedPatients})
        else this.setState({nothingFound: 'Nothing found...!!!'})
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div className='Search'>
                <Form formTitle="Search Patients" onSubmit={this.handleSubmit}>
                    <Input id='search' type='text' name='search' labelVal="Search by patient's name: " required={true} onChange={this.handleChange} inputVal={this.state.search}/>
                    <Button className='btn btn-primary' type='submit' val='Search'/>
                </Form>
                <div className="searchResult">
                    {this.state.searchResult.length ? (
                        this.state.searchResult.map(
                            patient => {
                                return (
                                    <Patient key={patient._id} id={patient._id}>
                                        <h3>Name: {patient.name}</h3>
                                        {patient.admittedOn ? <p>Admitted on {(new Date(patient.admittedOn)).toDateString() + ' at ' + (new Date(patient.admittedOn)).toLocaleTimeString()}</p> : <></>}
                                        {patient.disease ? <h5>Disease: {patient.disease}</h5> : <></>}
                                        {patient.description ? <p>Description: {patient.description}</p> : <></>}
                                        {patient.dischargedOn ? <p>Discharged on {(new Date(patient.dischargedOn)).toDateString()}</p> : <></>}
                                        {patient.diedOn ? <p>Died on {(new Date(patient.diedOn)).toDateString()}</p> : <></>}
                                        {patient.details ? <p>Details: {patient.details}</p> : <></>}
                                    </Patient>
                                )
                            }
                        )
                    ) : <h4>{this.state.nothingFound}</h4>}
                </div>
            </div>
        )
    }
})
