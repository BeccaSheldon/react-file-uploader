import React, {Component} from 'react'
import TableRow from './TableRow.jsx'
import Row from '../layout/Row.jsx'

export default class Table extends Component {
	render() {
		return(
			<Row className="Table">
				{this.props.files.length >= 1 &&
					<table>
						<thead>
							<tr>
								<th className="Table-header">ID</th>
								<th className="Table-header">Name</th>
								<th className="Table-header">Date</th>
								<th className="Table-header">Size</th>
							</tr>
						</thead>
						<tbody>
							{this.props.files.map((file, index) => (
								<TableRow {...{
									key: index,
									id: index+1,
									name: file.name,
									date: file.date,
									size: file.size
							  }} />
							))}
						</tbody>
					</table>
				}
			</Row>
		)
	}
}