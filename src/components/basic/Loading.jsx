import React from 'react'
import Spinner from 'react-spinkit'
import Row from '../layout/Row.jsx'

export default function Loading({}) {
	return(
		<Row className="Loading">
		  <Spinner name="wave" color="#FC8F8A" />
		</Row>
	)
}
