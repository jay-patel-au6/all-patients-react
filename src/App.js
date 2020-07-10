import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Statistics from './pages/Statistics.jsx';
import AdmitNewForm from './pages/AdmitNewForm.jsx'
import UpdateStatus from './pages/UpdateStatus.jsx'

class App extends Component {
	constructor() {
		super()

		this.server = `http://localhost:8080`

		this.state = {}

		this.handleAdmitNew = this.handleAdmitNew.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		// this.getAllStat = this.getAllStat.bind(this)
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar>
						<NavLink exact={true} to='/' className='btn btn-light NavLink'>Home</NavLink>
						<NavLink exact={true} to='/search' className='btn btn-light NavLink'>Search</NavLink>
						<NavLink exact={true} to='/statistics' className='btn btn-light NavLink'>Statistics</NavLink>
					</Navbar>
					<Switch>
						<Route exact={true} path='/' render={
							defaultProps => <Home {...defaultProps} admitted={this.state.admitted}/>	
						}></Route>
						<Route exact={true} path='/search' render={
							defaultProps => <Search server={this.server}/>
						}></Route>
						<Route exact={true} path='/statistics' render={
							defaultProps => <Statistics allMonthlyStats={this.state.allMonthlyStats}/>
						}></Route>
						<Route exact={true} path='/admitNew' render={
							defaultProps => <AdmitNewForm onSubmit={this.handleAdmitNew}/>
						}></Route>
						<Route exact={true} path='/updateStatus/:patientId/:admittedOn' render={
							defaultProps =>	<UpdateStatus _id={defaultProps.match.params.patientId} admittedOn={defaultProps.match.params.admittedOn} onSubmit={this.handleUpdate}/>
						}></Route>
						<Redirect to='/'/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}

	async componentDidMount() {
		try {
			let fetched = await fetch(this.server)
			let {admitted, allMonthlyStats} = await fetched.json()
			this.setState({admitted: admitted})
			this.setState({allMonthlyStats: allMonthlyStats})

		} catch(err) {
			console.error(err)
		}
	}
	
	async handleAdmitNew(newPatientData) {
		try {
			let fetched = await fetch(`${this.server}/admitNew`, {
				method: 'POST',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(newPatientData)
			})
			let {savedPatient: newPatient, updatedMonthlyStat} = await fetched.json()


			this.setState({admitted: [newPatient, ...this.state.admitted]}, () => console.log(this.state, 'handelAdmitNew App'))
			

			if(!this.state.allMonthlyStats.length) return this.setState({allMonthlyStats: [updatedMonthlyStat]})

			else if(!this.state.allMonthlyStats.find(monthStat => monthStat.month === updatedMonthlyStat.month)) this.setState({
				allMonthlyStats: [...this.state.allMonthlyStats, updatedMonthlyStat]
			})

			else if(this.state.allMonthlyStats.find(monthStat => monthStat.month === updatedMonthlyStat.month)) this.setState({
				allMonthlyStats: this.state.allMonthlyStats.map(monthStat => {
					if(monthStat._id === updatedMonthlyStat._id) return updatedMonthlyStat
					else return monthStat
				})
			})

		} catch(err) {
			console.log(err)
		}
	}

	async handleUpdate(updateData) {
		try {
			let fetched = await fetch(`${this.server}/updateStatus`, {
				method: 'PUT',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(updateData)
			})
			let {updatedPatient, updatedMonthlyStat} = await fetched.json()

			this.setState({admitted: this.state.admitted.filter(patient => patient._id !== updatedPatient._id)})
			this.setState({allMonthlyStats: this.state.allMonthlyStats.map(monthStat => {
				if(monthStat._id === updatedMonthlyStat._id) return updatedMonthlyStat
				else return monthStat
			})})

		} catch(err) {
			console.error(err)
		}
	}

	// async getAllStat() {
	// 	return await this.state.allMonthlyStats
	// }
}



export default App;
