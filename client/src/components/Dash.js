import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/DS.css';

function Dash() {
  const [boxes, setBoxes] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    // Fetch the box data from the backend API
    const fetchBoxes = async () => {
      try {
        const response = await axios.get('/api/boxes', {
          params: {
            semester: selectedSemester,
          },
        });
        setBoxes(response.data);
      } catch (error) {
        console.error('Error fetching box data:', error);
      }
    };

    fetchBoxes();
  }, [selectedSemester]);

  const getSemesterOptions = () => {
    const semesters = [];
    for (let i = 1; i <= 8; i++) {
      semesters.push(`${i}`);
    }
    return semesters;
  };
  

  return (
    <div className="container">
      <h1 className="heading">Courses</h1>
      <div className="filter-container">
      <label htmlFor="semesterFilter">Select Semester:</label>
      <select
        id="semesterFilter"
        value={selectedSemester}
        onChange={(e) => setSelectedSemester(e.target.value)}
      >
        <option value="">All</option>
        {getSemesterOptions().map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    </div>

      <div className="box-container">
        {boxes.map((box) => (
          <div className="box" key={box._id}>
            <img src={box.image} alt="" />
            <h3>{box.title}</h3>
            <p>{box.description}</p>
            <Link to={`/courses/${box._id}`} className="btn">
            read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Dash;
