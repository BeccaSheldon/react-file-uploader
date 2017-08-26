import React, {Component} from 'react'
import AddFiles from '../Files/AddFiles.jsx'
import GetListItems from '../List/GetListItems.jsx'
import Row from '../Row/Row.jsx'
import './Projects.scss'

export default class Projects extends Component {
	render() {
		return(
			<Row rowClass="Projects">
        <h1>Projects</h1>
        <AddFiles />
				<GetListItems />
			</Row>
		)
	}
}