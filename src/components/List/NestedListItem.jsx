import React, {Component} from 'react'
import DateFormat from 'dateformat'

export default class NestedListItem extends Component {
  formatDate(timestamp) {
    let ms = new Date(timestamp)
    let formattedDate = DateFormat(ms, 'm/d/yyyy @ h:MM TT Z')
    return formattedDate
  }

  render() {
    return (
      <li className="NestedListItem">
        {this.props.name}
      </li>
    )
  }
}

