import React, { Component } from 'react';
import { connect } from  'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import actions
import { getAllUsers } from '../Actions';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    height: '100vh',
    marginTop: '30px',
  },
});

class UserList extends Component {
  constructor(props){
    super(props);
    // this.props.getAllUsers();
    this.state = {
      users: [],
      hasData: false,
    }
  }

  componentDidMount(){
    // if(this.props.users){
    //   this.sortUsers();
    // }
    const users = this.props.users;
    this.setState({ users: users})
  }

  // sortUsers(){
  //   // if (this.props.users) {
  //     let unList = [];
  //     this.props.users.forEach(user => {
  //       unList.push(user.name);
  //     })
  //     unList.sort()
  //     console.log('sorted', unList);
  //     this.setState({ users: unList })
  //     console.log('state', this.state)
  //   // }
  // }

  componentDidUpdate(prevProps){
    if(this.props.users.length !== prevProps.users.length){
      this.setState({ users: this.props.users })
      console.log('state', this.state);
    }
  }

  render(){
    // if (this.state.hasData) {
    //   this.sortUsers();
    // }

    let unList = [];
    this.state.users.forEach(user => {
      unList.push(user.name);
    })
    unList.sort()
    console.log('sorted', unList);

    return(
      <div>
        <p>Hello I'm a list</p>
        <div>
          {this.props.getting_users ? <h4>getting users</h4> : null}
          {this.props.get_users_error ? <h4>error: cannot get users</h4> : null}
          {/*this.props.users && <p>got users</p>*/}
          {/*this.props.users.length*/}
          {/*this.props.users.map((user) => {
            return(
              <div key={user}>{user.name}</div>
            )
          })*/}
          {unList.length > 0 && 
            <div>
              <p>has sorted list</p>
              {unList.map((user) => {
                return (
                  <div key={user}>{user}</div>
                )
              })}
            </div>
          }
        </div>
      </div>
    )
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    users: state.UsersReducer.users,
    getting_users: state.UsersReducer.getting_users,
    get_users_error: state.UsersReducer.get_users_error,
  }
}

// export default UserList;
export default connect(mapStateToProps, { getAllUsers })(withStyles(styles)(UserList));