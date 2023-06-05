import React from 'react';
import { Link, useParams} from 'react-router-dom';
import '../styles/CDS.css';

function CDash() {

  const { courseId } = useParams();

  return (
    <div className="container">
      <h1 className="heading"></h1>
      <div className="box-container">
        <div className="box">
          <h3>Grades and Scores</h3>
          <Link to={`/courses/${courseId}/grades`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-2.png" alt="" />
          <h3>Attendance</h3>
          <Link to={`/attendance`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-3.png" alt="" />
          <h3>Feedback</h3>
          <Link to={`/feedback`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-4.png" alt="" />
          <h3>Question Banks and Text Books</h3>
          <Link to={`/courses/${courseId}/qb`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-5.png" alt="" />
          <h3>Lecture Videos and Web Resources</h3>
          <Link to={`/courses/${courseId}/lecture`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-5.png" alt="" />
          <h3>Lecture Plan</h3>
          <Link to={`/courses/${courseId}/lp`} className="btn">
            Click Here
          </Link>
        </div>
        <div className="box">
          <img src="image/icon-5.png" alt="" />
          <h3>Course Syllabus</h3>
          <a href="https://www.education.pa.gov/Documents/Postsecondary-Adult/College%20and%20Career%20Education/Private%20Licensed%20Schools/Sample%20Syllabus.pdf" className="btn" download>
            Click Here
          </a>
        </div>

        <div className="box">
          <img src="image/icon-5.png" alt="" />
          <h3>Assessment Plan</h3>
          <Link to={`/courses/${courseId}/ap`} className="btn">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CDash;
