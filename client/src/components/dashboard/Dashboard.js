import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
  /*
    fist, call action set getCurrentProfile
  */
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    /* 
      profile===null : before fetch 
      profile==={} : user with no profile 
      profile==={key:val} : user with profile 
    */
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = <h1>hello</h1>;
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>user profile</h1>;
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
