import React, {Component} from 'react'
import Row from '../layout/Row.jsx'
import TableRow from './TableRow.jsx'

export default class Table extends Component {
	render() {
		return(
			<Row className="Table">
				<table>
					<thead>
						<tr>
							<th className="Table-header type">Type</th>
							<th className="Table-header name">Name</th>
							<th className="Table-header date">Date</th>
							<th className="Table-header size">Size</th>
						</tr>
					</thead>
					<tbody>
						{this.props.files.map((file, index) => (
							<TableRow
								children={file.children}
								className={file.className}
								date={file.date}
								name={file.name}
								href={file.href}
								id={file.id}
								icon={file.type === 'folder' ? 'fa fa-folder' : 'fa fa-file'}
								key={index}
								size={file.size}
								type={file.type}
						 	/>
						))}
					</tbody>
				</table>
			</Row>
		)
	}
}