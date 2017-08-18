import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'
import Row from '../layout/Row.jsx'

export default class CreateFile extends Component {
	render() {
		return(
			<Row className="Create-file">
				<h3>Add a File</h3>
			  <Input
				  changeHandler={this.props.nameFile}
				  className="Create-file-input"
				  placeholder="Type in a file name"
				  type="text"
				/>
				<Input
		  	  changeHandler={this.props.chooseFile}
		  	  className="Choose-file-input"
		  	  type="file"
		  	/>
		  	<Button
		  	  className="Upload-button"
		  	  clickHandler={this.props.createFile}
		  	  iconName="upload"
		  	/>
			</Row>
		)
	}
}