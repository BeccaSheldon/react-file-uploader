import React, {Component} from 'react'
import CreateFile from './CreateFile.jsx'
import CreateFolder from './CreateFolder.jsx'
import Row from '../layout/Row.jsx'

export default class AddFiles extends Component {
	render() {
		return(
			<Row className="Add-files">
				<CreateFolder
					createFolder={this.props.createFolder}
					nameFolder={this.props.nameFolder}
				/>
				<CreateFile
					createFile={this.props.createFile}
					nameFile={this.props.nameFile}
				/>
			</Row>
		)
	}
}