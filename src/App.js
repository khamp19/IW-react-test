import React, { Component } from "react";
import { connect } from  'react-redux';
import { getAllUsers } from './Actions';

class App extends Component{
	constructor(props){
		super(props);
		this.props.getAllUsers();
		this.state = {
			users: [],
			name: '',
			email: '',
			backgroundColor: {
				backgroundColor: "green",
				color: "white",
			},
			usersPerPage: 5,
			currentPage: 1,
			userError: false,
			emailError: false,
		}
	}

	componentDidMount() {
		let users = this.props.users;
		this.setState({ users: users });
	}

	componentDidUpdate(prevProps) {
		if (this.props.users.length !== prevProps.users.length) {
			this.userUpdate();
		}
	}

	userUpdate = () => {
		const users = this.props.users;
		this.setState({ users: users})
		// console.log('state', this.state);
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			userError: false,
			emailError: false
		})
	}

	addUser = (e) => {
		const name = this.state.name;
		const email = this.state.email;
		e.preventDefault();
		if(name.indexOf(' ') < 0){
			this.setState({ userError: true })
		} else if (email.indexOf('@') < 0 || email.indexOf('.com') < 0){
			this.setState({ emailError: true })
		} else {
			this.props.users.push(this.state);
		}
		console.log('props', this.props.users);
		this.setState({
			name: '',
			email: '',
		})
	}

	nextPage = () => {
		let page = this.state.currentPage + 1;
		this.setState({ currentPage: page });
	}

	prevPage = () => {
		let page = this.state.currentPage - 1;
		this.setState({ currentPage: page });
	}

	render(){
		const { name, email, usersPerPage, currentPage, userError, emailError } = this.state;

		//sort
		let unList = [];
		this.state.users.forEach(user => {
			unList.push([user.name, user.email]);
		})
		unList.sort()


		const allUsers = unList.map((user) => {
			if (user[1].indexOf(".biz") > 0){
				return ( 
					<div key={user} style={this.state.backgroundColor}>{user[0]}</div>
				)
			} else {
				return (
					<div key={user}>{user[0]}</div>
				)
			}
			
		});

		//pagination
		let lastUser = usersPerPage * currentPage;
		let firstUser = lastUser - usersPerPage;
		let page = allUsers.slice(firstUser, lastUser);
		// let lastPage = Math.round(allUsers.length / usersPerPage);
		// console.log('lastPage', lastPage);
		// console.log('currentPage', currentPage);

		return (
			<div>
				<h1>Industry Weapon Applicant Test</h1>
				<div className="list">
					<div>
						{this.props.getting_users ? <h4>getting users</h4> : null}
						{this.props.get_users_error ? <h4>error: cannot get users</h4> : null}						
						{page}
						{currentPage > 1 &&
							<button onClick={this.prevPage}>Previous</button>
						}
						{page.length ?
							<button onClick={this.nextPage}>Next</button>
						: null }
					</div>
				</div>
				<div className="new-user-form">
					<h4>Add New User</h4>
					<form onSubmit={this.addUser}>
						<input
							type="text"
							required
							name="name"
							placeholder="Full name"
							value={name}
							onChange={this.handleInput} 
						/>
						{userError ? <p>Please enter first and last name</p> : null}
						<input
							type="text"
							required
							name="email"
							placeholder="email"
							value={email}
							onChange={this.handleInput} 
						/>
						{emailError ? <p>Please enter a valid email</p> : null}
						<button onClick={this.addUser}>Add User</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    users: state.UsersReducer.users,
    getting_users: state.UsersReducer.getting_users,
    get_users_error: state.UsersReducer.get_users_error,
  }
}

export default connect(mapStateToProps, { getAllUsers })(App)