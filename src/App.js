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
		}
	}

	componentDidMount() {
		let users = this.props.users;
		this.setState({ users: users });
	}

	//not working
	componentDidUpdate(prevProps) {
		if (this.props.users.length !== prevProps.users.length) {
			this.userUpdate();
		}
	}

	userUpdate = () => {
		const users = this.props.users;
		this.setState({ users: users})
		console.log('state', this.state);
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	addUser = (e) => {
		e.preventDefault();
		// this.props.makeUser(this.state);
		this.props.users.push(this.state);
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
		const { name, email, users, usersPerPage, currentPage } = this.state;
		//background
		// if (user.email.indexOf(".biz") > 0) {
		// 	this.setState({ backgroundColor: "green" })
		// }

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

		return (
			<div>
				<h1>Industry Weapon Applicant Test</h1>
				<div className="list">
					<div>
						{this.props.getting_users ? <h4>getting users</h4> : null}
						{this.props.get_users_error ? <h4>error: cannot get users</h4> : null}						
						{/*unList.length > 0 &&
							<div>
								{unList.map((user) => {
									return (
										<div key={user}>{user}</div>
									)
								})}
							</div>
							*/}
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
							name="name"
							placeholder="Full name"
							value={name}
							onChange={this.handleInput} 
						/>
						<input
							type="text"
							name="email"
							placeholder="email"
							value={email}
							onChange={this.handleInput} 
						/>
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