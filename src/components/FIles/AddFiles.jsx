import React, {Component} from 'react'
import BlockLoader from '../Loaders/BlockLoader.jsx'
import CreateFile from './CreateFile.jsx'
import CreateFolder from './CreateFolder.jsx'
import Row from '../Row/Row.jsx'
import S3 from '../config/setupS3.jsx'
import './AddFiles.scss'

export default class AddFiles extends Component {
	constructor(props) {
		super(props)
		this.state = {
			filebody: '',
			filename: '',
			filetype: '',
			foldername: '',
			loading: false
		}
	}

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
			if (data) alert("Success!")
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
			if (data) alert("Success!")
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
			<Row rowClass="Add-files">
				{this.state.loading && <BlockLoader />}
				<CreateFolder
        	createFolder={this.createFolder.bind(this)}
        	nameFolder={this.nameFolder.bind(this)}
				/>
				<CreateFile
        	chooseFile={this.chooseFile.bind(this)}
					createFile={this.createFile.bind(this)}
        	nameFile={this.nameFile.bind(this)}
				/>
			</Row>
		)
	}
}