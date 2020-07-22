import React, { Component } from 'react'
import './../styles/Statistics.css'

import Select from './../components/Select.jsx'
import DoughnutChart from './../components/DoughnutChart.jsx'

export default class Statistics extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
    }
    
    // async componentDidMount() {
    //     if(!this.props.allMonthlyStats) this.setState({allMonthlyStats: this.props.getAllStat()})
    //     else this.state.allMonthlyStats = this.props.allMonthlyStats
    // }

    render() {
        // this.state.allMonthlyStats ? console.log(this.state.allMonthlyStats) : console.log('waiting')
        if(this.props.allMonthlyStats) {
            
            let monthsList = ['']
            
            for(let i = 0; i < this.props.allMonthlyStats.length; i++) {
                monthsList.push(this.props.allMonthlyStats[i].month.toUpperCase())
            }
            
            let doughnutChartData = this.getDoughnutChartData()
            return (
                <div className='Statistics'>
                    <h1>Statistics</h1>
                    <Select id='month' name='month' labelVal='Select a Month: ' onChange={this.handleChange} options={monthsList} inputVal={this.state.month}/>
                    {doughnutChartData ? (
                        <>
                        <DoughnutChart data={doughnutChartData}/>
                        <br/>
                        <h4>Total patients admitted in the month: {doughnutChartData.total}</h4>
                        </>
                    ) : <></>}
                </div>
            )
        } else return <p>Loading...</p>
    }

    async handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    getDoughnutChartData() {
        if(!this.state.month) return null
        let {month, total, discharged, died} = this.props.allMonthlyStats.find(monthStat => {
            return monthStat.month.toLowerCase() === this.state.month.toLowerCase()
        })

        let recovery = ''
        if(discharged || died) recovery = (Number(discharged || 0) / (Number(discharged || 0) + Number(died || 0)) * 100).toFixed(0) + '% Recovery'

        let dataPoints = [
            // {name: 'Total', y: total},
            {name: 'Curing', y: (total) - (discharged || 0) - (died || 0)},
            {name: 'Died', y: died || 0},
            {name: 'Cured', y: discharged || 0},
        ]
        return {month: month.toUpperCase(), recovery, dataPoints, total}
    }
}
