import React, {Component} from 'react'
import AddFiles from './AddFiles.jsx'
import DateFormat from 'dateformat'
import Loading from '../basic/Loading.jsx'
import Row from '../layout/Row.jsx'
import S3 from '../config/setupS3.jsx'
import Table from './Table.jsx'

export default class Projects extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filebody: '',
			filename: '',
			files: '',
			filetype: '',
			foldername: '',
			loading: false,
			rootFiles: [],
			nestedFiles: []
		}
	}

	componentDidMount() {
		this.getFiles()
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

	getFiles() {
		this.setState({loading: true})
		S3().listObjects((err, data) => {
			this.setState({loading: false})
			if (err) console.log("Hit a snag listing items: ", err, err.stack)
			if (data) {
				this.setState({files: data.Contents})
				this.mapRootFiles(data.Contents)
			}
		})
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

	// Upload methods
	chooseFile(event) {
		let reader = new FileReader()
		let file = event.target.files[0]
		reader.onloadend = (upload) => {
			this.setState({
			 filebody: upload.target.result,
			 filename: this.state.filename !== '' ? `${this.state.filename}-${file.name}` : file.name,
			 filetype: file.type
			})
		}
		reader.readAsDataURL(file)
  }

	createFile() {
		this.setState({loading: true})
		let params = {
			Body: new Buffer(this.state.filebody.replace(/^data:image\/\w+;base64,/, ""),'base64'),
			Bucket: 'react-file-uploader',
			Key: this.state.filename
		}
		S3().putObject(params, (err, data) => {
			this.setState({loading: false})
			if (err) console.log("Hit a snag uploading file: ", err, err.stack)
			if (data) this.getFiles()
		})
		this.resetFile()
	}

	createFolder() {
		this.setState({loading: true})
		let params = {
			Bucket: 'react-file-uploader',
			Key: this.state.foldername + '/',
		}
		S3().putObject(params, (err, data) => {
			this.setState({loading: false})
			if (err) console.log("Hit a snag creating folder: ", err, err.stack)
			if (data) this.getFiles()
		})
		this.resetFolder()
	}

	nameFile(event) {
		this.setState({filename: event.target.value})
	}

	nameFolder(event) {
		this.setState({foldername: event.target.value})
	}

	// Clear file state and values from file inputs
	resetFile() {
		this.setState({
			filebody: '',
			filename: '',
			filetype: ''
		})
		let elements = [].slice.call(document.getElementsByClassName('create-file'))
		elements.map((input) => {
			return input.value = ''
		})
	}

	// Clear folder state and input
	resetFolder() {
		this.setState({foldername: ''})
		let elements = [].slice.call(document.getElementsByClassName('Create-folder-input'))
		elements.map((input) => {
			return input.value = ''
		})
	}

	render() {
		return(
			<Row className="Projects">
        <h1>Projects</h1>
        <AddFiles
        	chooseFile={this.chooseFile.bind(this)}
					createFile={this.createFile.bind(this)}
        	createFolder={this.createFolder.bind(this)}
        	nameFile={this.nameFile.bind(this)}
        	nameFolder={this.nameFolder.bind(this)}
        />
				{this.state.loading && <Loading />}
				{!this.state.loading && this.state.files &&
					<Table
						files={this.state.rootFiles.concat(this.state.nestedFiles)}
					/>
				}
			</Row>
		)
	}
}