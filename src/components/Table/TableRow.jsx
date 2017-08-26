import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'
import Link from '../basic/Link.jsx'
import S3 from '../config/setupS3.jsx'

export default class TableRow extends Component {
	showRow(fileId) {
		let el = document.getElementById(fileId)
		el.setAttribute('class', 'Table-row')
	}

	hideRow(fileId) {
		let el = document.getElementById(fileId)
		el.setAttribute('class', 'Table-row hidden')
	}

	deleteRow() {
		this.hideRow(this.props.id)
		let params = {
			Bucket: 'react-file-uploader',
			Key: this.props.name
		}
		S3().deleteObject(params, (err, data) => {
			if (err) console.log("Hit a snag deleting file: ", err, err.stack)
			if (data) console.log("Successfully deleted")
		})
	}

	handleClick() {
		console.log("clicked: ", this.props.children)
		if (this.props.children.length > 0) {
			this.props.children.map((child) => {
				console.log("CHILD: ", child)
				this.showRow(child.id)
			})
		} else {
			console.log("No children to show")
		}
	}

	render() {
		return (
			<tr id={this.props.id} className={this.props.className}>
				<td className="Table-row-cell type">
					<i className={this.props.icon}></i>
				</td>
				{this.props.type === 'file' &&
				<td className="Table-row-cell name">
					<Link
						clickHandler={this.handleClick.bind(this)}
						text={this.props.name}
						url={this.props.href}
					/>
				</td>
				}
				{this.props.type === 'folder' &&
				<td className="Table-row-cell name">
					<Link
						clickHandler={this.handleClick.bind(this)}
						iconName="angle-down"
						text={this.props.name.replace(/\/$/, ' ')}
						/>
				</td>
				}
				<td className="Table-row-cell actions">
					<Button
						className="Remove-button"
						clickHandler={this.deleteRow.bind(this)}
						iconName="remove"
					/>
				</td>
				<td className="Table-row-cell date">
					{this.props.date}
				</td>
				<td className="Table-row-cell size">
					{this.props.size}
				</td>
			</tr>
		)
	}
}