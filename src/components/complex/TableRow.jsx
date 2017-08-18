import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Input from '../basic/Input.jsx'
import Link from '../basic/Link.jsx'

export default class TableRow extends Component {
	render() {
		return (
			<tr className="Table-row">
				<td className="Table-row-cell id">
					{this.props.id}
				</td>
				<td className="Table-row-cell name">
					<Link
						href="#"
						text={this.props.name}
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