import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'

export default class EmptyTableRow extends Component {
	render() {
		return (
			<tr className="Table-row">
				<td className="Table-row-cell id">
					{this.props.newFileId}
				</td>
				<td className="Table-row-cell name">
					 Type in a file name"

					<Input
					  changeHandler={this.props.nameFile}
					  className="Add-file-input"
					  type="text"
					/>
				</td>
				<td className="Table-row-cell date">
					<Input
					  changeHandler={this.props.chooseFile}
					  className="Add-file-input"
					  type="file"
					/>
				</td>
				<td className="Table-row-cell size">
					<Button
					  className="Upload-button"
					  clickHandler={this.props.uploadFile}
					  iconName="upload"
					/>
				</td>
			</tr>
		)
	}
}