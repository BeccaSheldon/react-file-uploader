import React, {Component} from 'react'
import NavFooter from './Navbar/NavFooter.jsx'
import NavHeader from './Navbar/NavHeader.jsx'
import Projects from './Projects/Projects.jsx'

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
