import React, {Component} from 'react'
import Link from '../Links/Link.jsx'
import Row from '../Row/Row.jsx'
import './Navbar.scss'

export default class NavHeader extends Component {
	render() {
		return (
			<Row rowClass="Header">
				<ul className="Navbar-items">
					<li>
						<Link
							className="pulse"
							target="_blank"
							text="Source"
							url="https://github.com/BeccaSheldon/react-file-uploader"
						></Link>
					</li>
				</ul>
			</Row>
		)
	}
}
