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

	listFiles() {
		this.setState({loading: true})

		S3().listObjects((err, data) => {
			this.setState({loading: false})
			this.setState({files: data.Contents})
		})
	}

	componentDidMount() {
		this.listFiles()
	}

	nameFile(event) {
		this.setState({filename: event.target.value})
	}

	nameFolder(event) {
		this.setState({foldername: event.target.value})
	}

	createFolder() {
		let params = {
			Bucket: 'react-file-uploader',
			Key: this.state.foldername + '/',
		}
		S3().putObject(params, (err, data) => {
			if (err) console.log("Hit a snag creating folder: ", err, err.stack)
			if (data) this.listFiles()
		})
	}

	chooseFile(event) {
		let reader = new FileReader()
		let file = event.target.files[0]
		reader.onloadend = (upload) => {
			this.setState({
			 filebody: upload.target.result,
			 filename: this.state.filename || file.name,
			 filetype: file.type
			})
		}
		reader.readAsDataURL(file)
  }

	createFile() {
		let params = {
			Body: new Buffer(this.state.filebody.replace(/^data:image\/\w+;base64,/, ""),'base64'),
			Bucket: 'react-file-uploader',
			Key: this.state.filename
		}

		S3().putObject(params, (err, data) => {
			if (err) console.log("Hit a snag uploading file: ", err, err.stack)
			if (data) {
				this.listFiles()
			}
		})
	}

	render() {
		return(
			<Row className="Projects">
        <h1>Projects</h1>
        <AddFiles
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