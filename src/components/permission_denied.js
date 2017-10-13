import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PermissionDenied extends Component {
  render() {
    // Middleware for form
    const { handleSubmit } = this.props;

    return(
      <div>
        <h3>
          You must be logged in to do this!
        </h3>
        <Link to="/" className="btn btn-danger">Go back</Link>
      </div>
    )
  }
}


export default PermissionDenied;
