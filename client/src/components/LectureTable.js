import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const LectureTable = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios.get(`/api/courses/${courseId}/lectures`)
      .then((response) => {
        setLectures(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lectures:', error);
      });
  }, [courseId]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lecture Number</TableCell>
            <TableCell>Lecture Name</TableCell>
            <TableCell>Lecture Resources</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lectures.map((lecture) => (
            <TableRow key={lecture._id}>
              <TableCell>{lecture.lectureNumber}</TableCell>
              <TableCell>{lecture.lectureName}</TableCell>
              <TableCell>
                <ul>
                  <li>
                    <a href={lecture.lectureVideoLink} target="_blank" rel="noopener noreferrer">
                      Lecture Video
                    </a>
                  </li>
                  {lecture.additionalResources.map((resource, index) => (
                    <li key={index}>
                      <a href={resource} target="_blank" rel="noopener noreferrer">
                        Resource {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LectureTable;
