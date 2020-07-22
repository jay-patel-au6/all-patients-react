import React, { Component } from 'react'

import CanvasJSReact from '../assets/canvasjs.react'
import './../styles/Museo100-Regular_2.otf'
import './../styles/DoughnutChart.css'

// const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class DoughnutChart extends Component {
	// constructor(props) {
	// 	super(props)
	// }
    render() {
		let {month, recovery, dataPoints} = this.props.data

        const options = {
			animationEnabled: true,
			title: {
				text: month
			},
			subtitles: [{
				text: recovery,
				verticalAlign: "center",
				fontSize: 20,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{y}",
				yValueFormatString: "#,###",
				dataPoints: dataPoints
			}]
		}
            
        return (
            <div className="DoughnutChart">
				<CanvasJSChart options = {options}
					/* onRef = {ref => this.chart = ref} */
				/>
            </div>
        );
    }
}
