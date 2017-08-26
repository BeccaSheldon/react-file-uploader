import React from 'react'
import Spinner from 'react-spinkit'
import Row from '../Row/Row.jsx'

export default function BlockLoader({}) {
	return(
		<Row rowClass="BlockLoader">
		  <Spinner name="wave" color="#FC8F8A" />
		</Row>
	)
}
