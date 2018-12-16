import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      displaySocialInputs: false,

      profileData: {
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
      },
      errors: {}
    };
  }
  componentDidMount() {
    // update store value
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // convert skills array to CSV
      const trimedSkills = profile.skills.map(skill => skill.trim());
      profile.skills = trimedSkills.join(',');
      // convert emprty profile filed into empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // set into component state value
      this.setState({ profileData: profile });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const { profileData } = this.state;
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = e => {
    let currentProfile = this.state.profileData;
    currentProfile[e.target.name] = e.target.value;
    this.setState({ profileData: currentProfile });
  };
  toggleDisplaySocial = () => {
    this.setState({
      displaySocialInputs: !this.state.displaySocialInputs
    });
  };
  render() {
    const currentThis = this;
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];
    const socialOptions = [
      {
        name: 'twitter',
        iconClass: 'fa-twitter',
        value: this.state.profileData.twitter,
        error: errors.twitter
      },
      {
        name: 'facebook',
        iconClass: 'fa-facebook',
        value: this.state.profileData.facebook,
        error: errors.facebook
      },
      {
        name: 'linkedin',
        iconClass: 'fa-linkedin',
        value: this.state.profileData.linkedin,
        error: errors.linkedin
      },
      {
        name: 'youtube',
        iconClass: 'fa-youtube',
        value: this.state.profileData.youtube,
        error: errors.youtube
      },
      {
        name: 'instagram',
        iconClass: 'fa-instagram',
        value: this.state.profileData.instagram,
        error: errors.instagram
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form action="" onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.profileData.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.profileData.status}
                  options={options}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give us some info"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.profileData.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.profileData.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.profileData.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.profileData.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.profileData.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.profileData.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.toggleDisplaySocial}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {displaySocialInputs &&
                  socialOptions.map((socialObj, i) => (
                    <div key={i + socialObj.name}>
                      <InputGroup
                        placeholder={`${socialObj.name} Page URL`}
                        name={socialObj.name}
                        icon={`fab ${socialObj.iconClass}`}
                        value={socialObj.value ? socialObj.value : ''}
                        onChange={currentThis.onChange}
                        error={socialObj.error}
                      />
                    </div>
                  ))}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
