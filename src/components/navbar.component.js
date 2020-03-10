import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">ExerTracker</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link className="nav-item nav-link active" to="/">Exercises<span className="sr-only">(current)</span></Link>
						<Link className="nav-item nav-link" to="/create">Create Exercise log</Link>
						<Link className="nav-item nav-link" to="/user">Create User</Link>
					</div>
				</div>
			</nav>
		);
	}
}