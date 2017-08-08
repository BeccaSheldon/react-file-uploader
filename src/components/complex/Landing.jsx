import React, {Component} from 'react'
import Button from '../basic/Button.jsx'
import Loading from '../basic/Loading.jsx'
import Row from '../layout/Row.jsx'

export default class Landing extends Component {
	render() {
		return(
			<div className="Landing">
        {this.props.loading  && <Loading />}
        {!this.props.loading &&
          <Row>
            <h1>Projects</h1>
            <p>Add files or create new project directories.</p>
            <Button className="Button-add" iconName="file-o" />
            <Button className="Button-add" iconName="folder-o" />
          </Row>
  			}
			</div>
		)
	}
}