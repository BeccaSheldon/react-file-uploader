import React, {Component} from 'react'
import ListItem from './ListItem.jsx'

export default class ListItems extends Component {
  render() {
    return (
      <ul className="ListItems">
      	{this.props.listItems.map((item, index) => (
      		<ListItem
            icon={item.type}
            id={index}
            key={index}
      			name={item.name}
            nestedListItems={item.children}
      		/>
      	))}
      </ul>
    )
  }
}

