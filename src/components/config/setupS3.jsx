import React from 'react'
import Credentials from './credentials.json'
import AWS from 'aws-sdk'

export default function setupS3(file) {
	AWS.config.update({
		accessKeyId: Credentials.accessKeyId,
		secretAccessKey: Credentials.secretAccessKey,
		'region': 'us-west-1'
	})
	let params = {
		Bucket: 'react-file-uploader',
		Key: file ? file : null
	}
	let S3 = new AWS.S3({params})
	return S3
}