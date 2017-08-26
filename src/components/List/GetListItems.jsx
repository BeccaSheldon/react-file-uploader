import React, {Component} from 'react'
import BlockLoader from '../Loaders/BlockLoader.jsx'
import DateFormat from 'dateformat'
import ListItems from './ListItems.jsx'
import Row from '../Row/Row.jsx'
import S3 from '../config/setupS3.jsx'

export default class GetListItems extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listItems: null,
			loading: true,
			nestedFiles: [],
			rootFiles: []
		}
	}

	componentDidMount() {
		this.getListItems()
	}

	getListItems() {
		S3().listObjects((err, data) => {
			if (err) console.log("Hit a snag listing items: ", err, err.stack)
			if (data) {
					this.setState({
						listItems: data.Contents,
						loading: false
				})
				this.mapRootFiles(data.Contents)
			}
		})
	}

	count(haystack, needle) {
		return [...haystack].filter(l => l === needle).length
	}

	isFolder(filename) {
		return String(filename).endsWith('/') ? true : false
	}

	getFileType(filename) {
		return String(filename).endsWith('/') ? 'folder' : 'file'
	}

	mapRootFiles(files) {
		files.map((file, index) => {
			if (this.count(file.Key, '/') <= 1) {
				this.state.rootFiles.push({
					name: file.Key,
					id: 'item-' + index,
					children: [],
					size: this.formatBytes(file.Size),
					date: this.formatDate(file.LastModified),
					type: this.getFileType(file.Key),
					href: this.formatLink(file.Key),
					className: 'Table-row'
				})
			} else {
				this.state.nestedFiles.push({
					name: file.Key,
					id: 'item-' + index,
					children: [],
					size: this.formatBytes(file.Size),
					date: this.formatDate(file.LastModified),
					type: this.getFileType(file.Key),
					href: this.formatLink(file.Key),
					className: 'Table-row hidden'
				})
			}
		})
		this.mapChildren()
	}

	mapChildren() {
		this.state.rootFiles.map((rootFile) => {
			this.state.nestedFiles.map((nestedFile) => {
				if (this.isFolder(rootFile.name) && rootFile.name.indexOf(nestedFile.name.split('/')[0]) > -1) {
					rootFile.children.push(nestedFile)
				}
			})
		})
		console.log(this.state.rootFiles)
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

	render() {
		return (
			<Row rowClass="Get-list-items">
				{this.state.loading && <BlockLoader />}
				{!this.state.loading &&
					<ListItems
		        listItems={this.state.rootFiles}
					/>
				}
			</Row>
		)
	}
}