import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'     // component is wrapped in withRouter() to redirect after form submission
import Form from './../components/Form.jsx'
import Input from './../components/Input.jsx'
import Button from './../components/Button.jsx'
import Select from './../components/Select.jsx'

export default withRouter(class UpdateStatus extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.history.push('/')    // path to redirect after form submission

        let updatePatient = {
            id: this.props._id,
            status: this.state.status
        }

        if(updatePatient.status === 'discharged') updatePatient.dischargedOn = this.state.updateDate
        else if(updatePatient.status === 'died') updatePatient.diedOn = this.state.updateDate

        if(this.state.details) updatePatient.details = this.state.details

        this.props.onSubmit(updatePatient)

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div className='div-flex'>
                <Form onSubmit={this.handleSubmit} formTitle='Update a patient'>
                    <Select id='status' name='status' labelVal='Status: ' required={true} options={['', 'Discharged', 'Died']} onChange={this.handleChange} inputVal={this.state.status}/>
                    <Input id='updateDate' name='updateDate' type='date' labelVal='Date: ' required={true} onChange={this.handleChange} inputVal={this.state.updateDate}/>
                    <Input id='details' type='text' name='details' labelVal='Details: ' onChange={this.handleChange} inputVal={this.state.details}/>
                    <Button className='btn btn-primary' type='submit' val='Submit'/>
                </Form>
            </div>
        )
    }
})
