import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function GradesAndScores() {
  const [grade, setGrade] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    fetchGrades();
  }, [courseId]);

  const fetchGrades = async () => {
    try {
      const response = await axios.get(`/api/grades/${courseId}`);
      setGrade(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    }
  };

  return (
    <div>
      {grade && (
        <div>
          <h2>Grade: {grade.grade}</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Assessment</TableCell>
                  <TableCell>Individual Score</TableCell>
                  <TableCell>Total Score</TableCell>
                  <TableCell>Class Highest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grade.scores.map((score, index) => (
                  <TableRow key={index}>
                    <TableCell>{score.assessment}</TableCell>
                    <TableCell>{score.individualScore}</TableCell>
                    <TableCell>{score.totalScore}</TableCell>
                    <TableCell>{score.classHighest}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default GradesAndScores;
