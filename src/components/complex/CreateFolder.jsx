import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'
import Row from '../layout/Row.jsx'

export default class CreateFolder extends Component {
	render() {
		return(
			<Row className="Create-folder">
				<h3>Add a Folder</h3>
			  <Input
				  changeHandler={this.props.nameFolder}
				  className="Create-folder-input"
				  placeholder="Type in a folder name"
				  type="text"
				/>
		  	<Button
		  	  className="Add-button"
		  	  clickHandler={this.props.createFolder}
		  	  iconName="plus"
		  	/>
			</Row>
		)
	}
}