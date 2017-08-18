import React from 'react'
import AWS from 'aws-sdk'

export default function setupS3(file) {
	AWS.config.update({
		accessKeyId: 'AKIAI6U63PCNU4TI74AQ',
		secretAccessKey: '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',
		'region': 'us-west-1'
	})
	let params = {
		Bucket: 'react-file-uploader',
		Key: file ? file : null
	}
	let S3 = new AWS.S3({params})
	return S3
}