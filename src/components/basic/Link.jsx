import React from 'react'

export default function Link({className, target, text, url}) {
  return (
    <a href={url} className={className} target={target}>
      {text ? text : url}
    </a>
  )
}