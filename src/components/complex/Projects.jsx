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
			fileName: '',
			loading: false
		}
	}

	handleSubmit() {
	  this.setState({loading: true})
		let url = `http://localhost:8080/react-file-uploader/projects`

	  fetch(url, {
	  	method: 'POST',
	  	body: JSON.stringify(this.state.fileName)
	  })
	  .then(result => result.json())
	  .then((data) => {
    	this.setState({
    		loading: false,
    		files: data
    	})
	  })
	  .catch(err => new Error(console.log('Hit a snag: ' + err)))
  }

	handleChange(event) {
	  this.setState({fileName: event.target.value})
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
				{!this.state.loading &&
					<Table
						tableRows={this.state.files}
					/>
				}
			</Row>
		)
	}
}