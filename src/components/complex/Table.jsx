import React, {Component} from 'react'
import DateFormat from 'dateformat'
import Row from '../layout/Row.jsx'
import TableRow from './TableRow.jsx'

export default class Table extends Component {
	formatDate(timestamp) {
		let ms = new Date(timestamp)
		let formattedDate = DateFormat(ms, 'm/d/yyyy h:MM TT Z')
		return formattedDate
	}

	formatBytes(bytes, decimals) {
		if (bytes <= 0) return bytes + ' Bytes'
		let kilobyte = 1024
		let precision = decimals || 1
		let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
		let i = Math.floor(Math.log(bytes) / Math.log(kilobyte))
		return parseFloat((bytes / Math.pow(kilobyte, i)).toFixed(precision)) + ' ' + sizes[i]
	}

	render() {
		return(
			<Row className="Table">
				<table>
					<thead>
						<tr>
							<th className="Table-header id">ID</th>
							<th className="Table-header name">Name</th>
							<th className="Table-header date">Date</th>
							<th className="Table-header size">Size</th>
						</tr>
					</thead>
					<tbody>
						{this.props.files.map((file, index) => (
							<TableRow
								date={this.formatDate(file.LastModified)}
								name={file.Key}
								id={index + 1}
								key={index}
								size={this.formatBytes(file.Size)}
						 	/>
						))}
					</tbody>
				</table>
			</Row>
		)
	}
}