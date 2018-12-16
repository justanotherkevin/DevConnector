import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostItem from './PostItem';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.post;

    const postsContainer =
      posts.length > 0 ? (
        posts.map(post => <PostItem key={post._id} post={post} />)
      ) : (
        <Spinner />
      );
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div className="posts-container">{postsContainer}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
  // posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
