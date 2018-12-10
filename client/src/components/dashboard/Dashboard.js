import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  /*
    fist, call action set getCurrentProfile
  */
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}
const mapStateToProps = () => {};
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
