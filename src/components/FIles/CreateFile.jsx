import React, {Component} from 'react'
import Button from '../Buttons/Button.jsx'
import Input from '../Inputs/Input.jsx'
import Row from '../Row/Row.jsx'

export default class CreateFile extends Component {
	render() {
		return(
			<Row rowClass="Create-file">
				<h3>Add a File</h3>
				<Input
					changeHandler={this.props.nameFile}
					className="Create-file-input create-file"
					placeholder="Type in a file name"
					type="text"
				/>
				<Input
		  	  changeHandler={this.props.chooseFile}
		  	  className="Choose-file-input create-file"
		  	  type="file"
		  	/>
		  	<Button
		  	  buttonClass="Upload-button"
		  	  clickHandler={this.props.createFile}
		  	  iconClass="upload"
		  	/>
			</Row>
		)
	}
}