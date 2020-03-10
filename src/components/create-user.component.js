import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: '',
		}
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username
		}

		axios.post(API_URL+'/users/add', user)
			.then(res => console.log(res.data));

		console.log(user);

		this.setState({
			username: '',
		})
	}
	render() {
		return (
			<div>
				<h3>Create New User</h3>
					<form onSubmit={this.onSubmit}>
						<div className='form-group'>
							<label>Username</label>
							<input type='text'
								className='form-control'
								value={this.state.username}
								onChange={this.onChangeUsername}
								required
							/>
						</div>
						<div className='form-group'>
							<input type='submit' value='create user' className='btn btn-dark' />
						</div>
					</form>
			</div>
		);
	}
}