import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { addClass } from '../../scripts/common';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const userData = { ...this.state }

    axios.post('/api/users/register', userData)
      .then(res => console.log(res.data))
      .catch(err => {
        this.setState({ errors: err.response.data });
        Object.keys(err.response.data).forEach( (key) => {
          addClass( this.refs.registerForm[key], 'is-invalid' )
        })
      });
  }

  render() {    
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit} ref="registerForm">
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Name"
                    name="name" required
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  { this.state.errors.name && 
                    <div className="invalid-feedback">{this.state.errors.name}</div>
                  }
                </div>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                  { this.state.errors.email && <div className="invalid-feedback">{this.state.errors.email}</div>}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                  { this.state.errors.password && <div className="invalid-feedback">{this.state.errors.password}</div>}
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange} />
                  { this.state.errors.password2 && <div className="invalid-feedback">{this.state.errors.password2}</div>}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(Register);