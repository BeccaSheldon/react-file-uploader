import React, {Component} from 'react'
import AddFiles from './AddFiles.jsx'
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
			loading: false
		}
	}

	componentDidMount() {
		this.listFiles()
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
			if (data) this.listFiles()
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
			if (data) this.listFiles()
		})
		this.resetFolder()
	}

	listFiles() {
		this.setState({loading: true})
		S3().listObjects((err, data) => {
			this.setState({loading: false})
			if (err) console.log("Hit a snag listing items: ", err, err.stack)
			if (data) this.setState({files: data.Contents})
		})
	}

	nameFile(event) {
		this.setState({filename: event.target.value})
	}

	nameFolder(event) {
		this.setState({foldername: event.target.value})
	}

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
						files={this.state.files}
					/>
				}
			</Row>
		)
	}
}