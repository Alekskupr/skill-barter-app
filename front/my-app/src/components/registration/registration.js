import './registration.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { profileUserAC } from '../../redux/actions';
import { ButtonToolbar,Button } from 'bootstrap-4-react';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      login: null,
      password: null,
    };
  }
  emailInState = e => {
    this.setState({ email: e.target.value });
  };
  loginInState = e => {
    this.setState({ login: e.target.value });
  };
  passwordInState = e => {
    this.setState({ password: e.target.value });
  };

  registration = async e => {
    e.preventDefault();
    const dataUser = this.state;
    const response = await fetch('/api/registration', {
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
  };

  render() {
    return (
      <div className="div-form">
        <form className="form-" onSubmit={this.registration}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="введите почту"
              onChange={this.emailInState}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="login" placeholder="введите логин" onChange={this.loginInState} />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="введите пароль" 
              onChange={this.passwordInState}
            />
          </div>
          <button type="submit" className="btn btn-light">Отправить</button>
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
)(Registration);
