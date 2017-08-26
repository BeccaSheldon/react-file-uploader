import React from 'react'

export default function Icon({iconClass}) {
	return (
		<i className={'fa fa-' + iconClass}></i>
	)
}