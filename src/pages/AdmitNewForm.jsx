import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Form from './../components/Form.jsx'
import Input from './../components/Input.jsx'
import Button from './../components/Button.jsx'


export default withRouter(class AdmitNewForm extends Component {    // component is wrapped in withRouter() to redirect after form submission
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleSubmit(event) {
        event.preventDefault()
        
        this.props.history.push('/')    // path to redirect after form submission

        let admittedOn = new Date(this.state.admittedOnDate + ' ' + this.state.admittedOnTime)
        let newPatient = {
            name: this.state.name,
            admittedOn: admittedOn,
            disease: this.state.disease,
            description: this.state.description,
            status: 'curing'
        }
        this.props.onSubmit(newPatient)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div className='div-flex'>
                <Form onSubmit={this.handleSubmit} formTitle='Admit a new patient'>
                    <Input id='name' type='text' name='name' labelVal='Name: ' required={true} onChange={this.handleChange} inputVal={this.state.name}/>
                    <Input id='admittedOnDate' type='date' name='admittedOnDate' labelVal='Date: ' required={true} onChange={this.handleChange} inputVal={this.state.admittedOnDate}/>
                    <Input id='admittedOnTime' type='time' name='admittedOnTime' labelVal='Time: ' required={true} onChange={this.handleChange} inputVal={this.state.admittedOnTime}/>
                    <Input id='disease' type='text' name='disease' labelVal='Disease: ' onChange={this.handleChange} inputVal={this.state.disease}/>
                    <Input id='description' type='text' name='description' labelVal='Description: ' onChange={this.handleChange} inputVal={this.state.description}/>
                    <Button className='btn btn-primary' type='submit' val='Submit'/>
                </Form>
            </div>
        )
    }
})
