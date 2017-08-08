import React, {Component} from 'react'
import NavFooter from './layout/NavFooter.jsx'
import NavHeader from './layout/NavHeader.jsx'
import Projects from './complex/Projects.jsx'

export default class App extends Component {
	render() {
		return(
			<div className="App">
				<div className="Wrapper">
					<NavHeader />
					<Projects />
				</div>
				<NavFooter />
			</div>
		);
	}
}
