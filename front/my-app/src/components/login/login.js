import './login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { profileUserAC } from '../../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      password: null,
    };
  }

  loginInStateLogin = e => {
    this.setState({ login: e.target.value });
  };
  passwordInStateLogin = e => {
    this.setState({ password: e.target.value });
  };

  login = async e => {
    e.preventDefault();
    const dataUser = this.state;
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: dataUser }),
    });
    const user = await response.json();
    console.log(user);
    this.props.profileUser(user);
    this.props.history.push('/alert');
  }

  render() {
    return (
      <div className="div-form">
        <form className="form-" onSubmit={this.login}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="login"
              placeholder="login"
              onChange={this.loginInStateLogin}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              onChange={this.passwordInStateLogin}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileUser: user => dispatch(profileUserAC(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);