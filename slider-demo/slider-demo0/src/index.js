import React, {Component} from 'react';
import {render} from 'react-dom';
import Slider from './components/slider/Slider.jsx';
import './index.scss';

class App extends Component {
	render(){
		return (
 		<div className="page-content">
 		  
 		    <div className="main-content">
 		       <Slider number={3} itemWidth={500} delayTime={1000} itemHeight={500}  autoPlay={true}>
 		       		<div className="item">
 		       			<div className="red">
 		       			   <h1>容器1</h1>
 		       			</div>
 		       		</div>
 		       		<div className="item">
 		       			<div className="yellow">
 		       			  <h1>容器2</h1>
 		       			</div>
 		       		</div>
 		       		<div className="item">
 		       			<div className="blue">
 		       			   <h1>容器3</h1>
 		       			</div>
 		       		</div>
 		       </Slider>
 		    </div>
 		
 		</div>
		)
	}
}

render(
	<App/>,
	document.getElementById('root')
)