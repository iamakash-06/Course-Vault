import React from 'react';
import '../styles/Slide.scss';
import { Link } from 'react-router-dom';

function Student() {
    return (
      <div>
      <Link to="/fotp">
        <div className="flex-title flex-title-home">Student</div>
        </Link>
        <div className="flex-about flex-about-home">
          <p>Click <Link to="/fotp">here</Link> to navigate to the student section of the website</p>
        </div>
      </div>
    );
  }

export default Student;