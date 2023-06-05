import React, { useState } from 'react';
import '../styles/Slide.scss';
import { Link } from 'react-router-dom';

function Faculty() {
    return (
      <div>
        <Link to="/fotp">
        <div className="flex-title">Faculty</div>
        </Link>
        <div className="flex-about">
          <p>Click <Link to="/profile/fotp">here</Link> to navigate to the faculty section of the website</p>
        </div>
      </div>
    );
  }

export default Faculty;