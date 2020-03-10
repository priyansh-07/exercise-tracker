import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const API_URL = 'https://focused-swirles-a774d9.netlify.com';

export default class EditExercise extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: []
		}

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		axios.get(API_URL+'/exercises/'+this.props.match.params.id)
		  .then(response => {
			this.setState({
			  username: response.data.username,
			  description: response.data.description,
			  duration: response.data.duration,
			  date: new Date(response.data.date)
			})   
		  })
		  .catch(function (error) {
			console.log(error);
		  })
	
		axios.get(API_URL+'/users/')
		  .then(response => {
			if (response.data.length > 0) {
			  this.setState({
				users: response.data.map(user => user.username),
			  })
			}
		  })
		  .catch((error) => {
			console.log(error);
		  })
	
	  }

	onChangeUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date
		}
		console.log(exercise);

		axios.post(API_URL+'/exercises/update/'+this.props.match.params.id, exercise)
			.then( res => console.log(res.data));

		window.location = '/';
	}

	render() {
		return (
			<div>
				<h3>Edit Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Username</label>
						<select ref="userInput"
							required
							className='form-control'
							value={this.state.username}
							onChange={this.onChangeUsername}>
							{
								this.state.users.map( user => {
									return <option key={user} value={user}>{user}</option>;
								})
							}
						</select>
					</div>
					
					<div className='form-group'>
						<label>Desciption</label>
						<input type='text' 
							className='form-control' 
							value={this.state.description}
							onChange={this.onChangeDescription} 
							required
						/>
					</div>

					<div className='form-group'>
						<label>Duration</label>
						<input type='text'
							className='form-control'
							value={this.state.duration}
							onChange={this.onChangeDuration}
							required
						/>
					</div>
					<div className='form-group'>
						<label>Date</label>
						<div>
							<DatePicker selected={this.state.date} onChange={this.onChangeDate} />
						</div>
					</div>
					<div className='form-group'>
						<input type='submit' value='Edit Exercise Log' className='btn btn-dark' />
					</div>
				</form>
			</div>
		);
	}
}