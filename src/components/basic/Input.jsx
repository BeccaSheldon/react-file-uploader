import React from 'react'

export default function Input({className, changeHandler, defaultValue, placeholder, type, value}) {
  return (
  	<input
    	className={className}
    	defaultValue={defaultValue}
  		onChange={changeHandler}
  		placeholder={placeholder}
  		type={type}
  		value={value}
      multiple
  	/>
  )
}