import React, {Component} from 'react'
import Button from '../Buttons/Button.jsx'
import Icon from '../Icons/Icon.jsx'
import Link from '../Links/Link.jsx'
import NestedListItems from './NestedListItems.jsx'
import Row from '../Row/Row.jsx'

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  toggleNestedItems() {
    this.state.open === false ? this.openNestedItems() : this.closeNestedItems()
  }

  openNestedItems() {
    this.setState({open: true})
  }

  closeNestedItems() {
    this.setState({open: false})
  }

  render() {
    return (
      <li className="ListItem">
        <Row rowClass="ParentItem">
          <Icon
            iconClass={this.props.icon}
          />
          <Link
            text={this.props.name}
          />
          <Button
            buttonClass="Toggle-button"
            clickHandler={this.toggleNestedItems.bind(this)}
            iconClass="angle-down"
          />
        </Row>
        {this.state.open === true &&
          <NestedListItems
            nestedListItems={this.props.nestedListItems}
          />
        }
      </li>
    )
  }
}

