import React, {Component} from 'react'
import DateFormat from 'dateformat'
import Row from '../layout/Row.jsx'
import TableRow from './TableRow.jsx'

export default class Table extends Component {
	checkFileType(filename) {
		return filename.endsWith('/') ? 1 : 0
	}

	checkFileLevel(filename) {
		let level = 0
		// console.log(filename.match('/'))
	}

	formatBytes(bytes, decimals) {
		if (bytes <= 0) return bytes + ' Bytes'
		let kilobyte = 1024
		let precision = decimals || 1
		let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
		let i = Math.floor(Math.log(bytes) / Math.log(kilobyte))
		return parseFloat((bytes / Math.pow(kilobyte, i)).toFixed(precision)) + ' ' + sizes[i]
	}

	formatDate(timestamp) {
		let ms = new Date(timestamp)
		let formattedDate = DateFormat(ms, 'm/d/yyyy h:MM TT Z')
		return formattedDate
	}

	formatLink(filename) {
		let base = 'https://s3-us-west-1.amazonaws.com/react-file-uploader'
		return `${base}/${filename}`
	}

	sortFiles(files) {
		files.sort((a, b) => {
			if (this.checkFileType(a.Key) > this.checkFileType(b.Key)) {
				return -1
			}
			if (this.checkFileType(a.Key) < this.checkFileType(b.Key)) {
				return 1
			}
			return 0
		})
		return files
	}

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
						{this.sortFiles(this.props.files).map((file, index) => (
							<TableRow
								date={this.formatDate(file.LastModified)}
								name={file.Key}
								href={this.formatLink(file.Key)}
								key={index}
								size={this.formatBytes(file.Size)}
								type={this.checkFileType(file.Key)}
								level={this.checkFileLevel(file.Key)}
						 	/>
						))}
					</tbody>
				</table>
			</Row>
		)
	}
}