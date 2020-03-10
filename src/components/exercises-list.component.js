import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const Exercise = props => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={'/edit/'+props.exercise._id}>Edit</Link> | <a href='#' onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
		</td>
	</tr>
)

export default class ExerciseList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = { exercises: [] };
	}

	componentDidMount() {
		axios.get(API_URL+'/exercises')
			.then(res => {
				if (res.data.length > 0) {
					this.setState({
						exercises: res.data
					})
				}
			})
			.catch(err => console.log('Error : ' + err));
	}

	deleteExercise(id) {
		axios.delete(API_URL+'/exercises/' + id)
			.then(res => console.log(res.data))

		this.setState({
			exercises: this.state.exercises.filter(el => el._id !== id)
		})
	}

	exerciseList() {
		return this.state.exercises.map( currentExercise => {
			return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
		})
	}
	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className='table'>
					<thead className='thead-dark'>
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.exerciseList()}
					</tbody>
				</table>
			</div>
		);
	}
}