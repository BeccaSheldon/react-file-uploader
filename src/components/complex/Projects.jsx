import React, {Component} from 'react'
import Landing from './Landing.jsx'
import Row from '../layout/Row.jsx'

export default class Projects extends Component {
	constructor(props) {
		super(props)
		this.state = {
			files: []
		}
	}

	render() {
		return(
			<Row className="Projects">
				<Landing />
			</Row>
		)
	}
}