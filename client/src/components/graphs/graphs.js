// /* App.js */
// var React = require('react');
// var Component = React.Component;
// import CanvasJSReact from 'canvasjs'
// // var CanvasJSReact = require('canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//
// export default class Graphs extends Component {
// 	render() {
// 		const options = {
// 			animationEnabled: true,
// 			exportEnabled: true,
// 			theme: "light2", //"light1", "dark1", "dark2"
// 			title:{
// 				text: "Simple Column Chart with Index Labels"
// 			},
// 			axisY: {
// 				includeZero: true
// 			},
// 			data: [{
// 				type: "column", //change type to bar, line, area, pie, etc
// 				//indexLabel: "{y}", //Shows y value on all Data Points
// 				indexLabelFontColor: "#5A5757",
// 				indexLabelPlacement: "outside",
// 				dataPoints: [
// 					{ x: 10, y: 71 },
// 					{ x: 20, y: 55 },
// 					{ x: 30, y: 50 },
// 					{ x: 40, y: 65 },
// 					{ x: 50, y: 71 },
// 					{ x: 60, y: 68 },
// 					{ x: 70, y: 38 },
// 					{ x: 80, y: 92, indexLabel: "Highest" },
// 					{ x: 90, y: 54 },
// 					{ x: 100, y: 60 },
// 					{ x: 110, y: 21 },
// 					{ x: 120, y: 49 },
// 					{ x: 130, y: 36 }
// 				]
// 			}]
// 		}

// 		return (
// 		<div>
// 			<CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }
//
// module.exports = Graphs;

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import actions from '../../redux/action'

export default function Graphs (props) {
  const dispatch = useDispatch()
  const data = useSelector(state => state)
  const [popularity, setPopularity] = useState()

  useEffect(()=>{
    
    dispatch(actions.getPopularityBb())

  },[])
  useEffect(() => {
    if(data.AdvertisingPoint?.popularityBB){
  let toSort = [...data.AdvertisingPoint.popularityBB]
         toSort.sort((a, b) => a.count > b.count ? 1 : -1).reverse()

    setPopularity(toSort)
    }

  }, [data.AdvertisingPoint?.popularityBB])
  return (
    <div className=''>
      {popularity &&
       popularity.map((p, index) => {
          return (
            <>
              <h2>{p.count}</h2>
              <h3>{p.AP.address.streetName}</h3>
              <p>------------------------------------</p>
            </>
          )
        })}
    </div>
  )
}
