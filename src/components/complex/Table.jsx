import React, {Component} from 'react'
import TableRow from './TableRow.jsx'
import Row from '../layout/Row.jsx'

export default class Table extends Component {
	render() {
		return(
			<Row className="Table-component">
				{this.props.files &&
					<table>
						<thead>
							<tr>
								<th className="Table-header">Name</th>
								<th className="Table-header">Size</th>
								<th className="Table-header">Date</th>
							</tr>
						</thead>
						<tbody>
							{this.props.files.map((file, index) => (
								<TableRow {...{
									name: file.name,
									size: file.size,
									date: file.date
							  }} />
							))}
						</tbody>
					</table>
				}
			</Row>
		)
	}
}