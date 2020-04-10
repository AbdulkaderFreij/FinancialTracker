import React, { Component } from 'react';
import CanvasJSReact from  './../../canvasjs.react';
import { Menu, Input } from 'semantic-ui-react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Reports extends Component {
    constructor(props){
        super(props);
        this.state={
            isPie: false,
            isByCategory:false,
            isYearly:false,
            type:"",
        }
    }

    type = e => {
        e.preventDefault();
        this.setState({ type: e.target.value });
        console.log("type", e.target.value);
        e.target.value === "pie" ? this.setState({isPie: true}) : this.setState({isPie:false})
      };

	render() {
        const optionsBar = {
			title: {
				text: "Basic Column Chart"
			},    width:600,
            height:800,
			animationEnabled: true,
			data: [
			{
				
				type: "column",
				dataPoints: [
					{ label: "Apple",  y: 10  },
					{ label: "Orange", y: 15  },
					{ label: "Banana", y: 25  },
					{ label: "Mango",  y: 30  },
					{ label: "Grape",  y: 28  }
				]
			}
			]
		}
		const optionsPie = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Website Traffic Sources"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 18, label: "Direct" },
					{ y: 49, label: "Organic Search" },
					{ y: 9, label: "Paid Search" },
					{ y: 5, label: "Referral" },
					{ y: 19, label: "Social" }
				]
			}]
		}
		
		return (
		<div>
            <div className="financial-menu">
			<h1>React Pie Chart</h1>
            <Menu secondary>
                <Menu.Item>
                <Input
                          list="type"
                          placeholder="Choose type..."
                          value={this.state.type}
                          onChange={e => this.type(e)}
                        />
                        <datalist id="type">
                          <option value="pie" />
                          <option value="bar" />
                        </datalist>
            </Menu.Item>
        </Menu>
        </div>
            {this.state.isPie? (<CanvasJSChart options = {optionsPie} 
				
			/>) : (<>			<CanvasJSChart options = {optionsBar} 
				
			/></>)}
		</div>
		);
	}
}
export default Reports;