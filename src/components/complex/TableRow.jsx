import React, {Component} from 'react'

export default class TableRow extends Component {
	render() {
		return (
			<tr className="Table-row">
				<td className="Table-row-cell">
					{this.props.id}
				</td>
				<td className="Table-row-cell">
					{this.props.name}
				</td>
				<td className="Table-row-cell">
					{this.props.date}
				</td>
				<td className="Table-row-cell">
					{this.props.size}
				</td>
			</tr>
		)
	}
}