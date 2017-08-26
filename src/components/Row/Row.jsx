import React from 'react'
import './Row.scss'

export default function Row({rowClass, children}) {
  return (
		<div className={"Row " + rowClass}>
			{children}
		</div>
  )
}