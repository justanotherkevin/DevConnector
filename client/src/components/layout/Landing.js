import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector </h1>
                <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                <hr />
                {/* <Route exact path="/register" */}
                <a href="register.html" className="btn btn-lg btn-info mr-2">Sign Up</a>
                <a href="login.html" className="btn btn-lg btn-light">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing;