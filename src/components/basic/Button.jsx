import React from 'react'

export default function Button({className, clickHandler, iconName, text}) {
	return (
    <button className={className} onClick={clickHandler}>
      {text ? text : <i className={"fa fa-" + iconName}></i>}
    </button>
  )
}