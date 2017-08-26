import React, {Component} from 'react'
import NestedListItem from './NestedListItem.jsx'

export default class NestedListItems extends Component {
  render() {
    return (
      <ul className="NestedListItems">
      	{this.props.nestedListItems.map((item, index) => (
      		<NestedListItem
            key={index}
            id={item.id}
      			name={item.name}
      		/>
      	))}
      </ul>
    )
  }
}

