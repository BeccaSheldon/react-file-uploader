import React from 'react'

export default function Link({className, clickHandler, iconName, target, text, url}) {
  return (
    <a href={url} className={className} onClick={clickHandler} target={target}>
      {text ? text : url}
      {iconName ? <i className={"fa fa-" + iconName}></i> : null}
    </a>
  )
}