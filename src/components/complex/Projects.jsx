import React, {Component} from 'react'
import AddFile from './AddFile.jsx'
import Loading from '../basic/Loading.jsx'
import Row from '../layout/Row.jsx'
import Table from './Table.jsx'

export default class Projects extends Component {
	constructor(props) {
		super(props)
		this.state = {
			files: [],
			newFile: {
				name: '',
				date: '',
				size: ''
			},
			loading: false
		}
	}

	handleSubmit() {
		this.setState({loading: true})
		this.state.files.push(this.state.newFile)
		this.setState({loading: false})
		console.log(this.state.files.length)
	}

	handleChange(event) {
	  this.setState({
	  	newFile: {
		  	name: event.target.value,
		  	date: Date.now(),
		  	size: 'tbd'
		  }
	  })
	}

	render() {
		return(
			<Row className="Projects">
        <h1>Projects</h1>
				<AddFile
					changeHandler={this.handleChange.bind(this)}
					clickHandler={this.handleSubmit.bind(this)}
					value={this.state.fileName}
				/>
				{this.state.loading && <Loading />}
				{!this.state.loading && this.state.files.length >= 1 &&
					<Table
						files={this.state.files}
					/>
				}
			</Row>
		)
	}
}