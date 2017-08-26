import React from 'react'
import Icon from '../Icons/Icon.jsx'
import './Button.scss'

export default function Button({buttonClass, clickHandler, iconClass, buttonText}) {
	return (
    <button className={'Button ' + buttonClass} onClick={clickHandler}>
       {buttonText ? buttonText : <Icon iconClass={iconClass} />}
    </button>
  )
}