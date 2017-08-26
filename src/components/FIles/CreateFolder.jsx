import React, {Component} from 'react'
import Button from '../Buttons/Button.jsx'
import Input from '../Inputs/Input.jsx'
import Row from '../Row/Row.jsx'

export default class CreateFolder extends Component {
	render() {
		return(
			<Row rowClass="Create-folder">
				<h3>Add a Folder</h3>
			  <Input
				  changeHandler={this.props.nameFolder}
				  className="Create-folder-input"
				  placeholder="Type in a folder name"
				  type="text"
				/>
		  	<Button
		  	  buttonClass="Add-button"
		  	  clickHandler={this.props.createFolder}
		  	  iconClass="plus"
		  	/>
			</Row>
		)
	}
}