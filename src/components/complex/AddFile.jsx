import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'
import Row from '../layout/Row.jsx'

export default class AddFile extends Component {
	render() {
		return(
			<Row className="Add-files">
			  <Input
			    changeHandler={this.props.changeHandler}
			    className="Add-file-input"
			    placeholder="Type in a folder name"
			    type="text"
			  />
			  <Button
			    className="Add-folder-button"
			    clickHandler={this.props.clickHandler}
			    iconName="plus"
			  />
			</Row>
		)
	}
}