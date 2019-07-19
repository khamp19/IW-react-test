import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeUser } from '../Actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    height: '100vh',
    marginTop: '75px',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#5aa6a2',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class NewUserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
    }
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

  render(){
    const { name, email } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <Grid container component="main" 
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">
            <CssBaseline />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Add New User
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.addUser}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    autoFocus
                    onChange={this.handleInput}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={this.handleInput}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.addUser}
                  >
                    Create User
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}


NewUserForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    users: state.UsersReducer.users,
    new_user: state.NewUserReducer.new_user,
    making_user: state.NewUserReducer.making_user,
    make_user_error: state.NewUserReducer.make_user_error,
  }
}

// export default NewUserForm;
export default connect(mapStateToProps, { makeUser })(withStyles(styles)(NewUserForm))

