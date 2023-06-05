import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const QuestionBankAndTextbooks = () => {
  const { courseId } = useParams();
  const [courseMaterials, setCourseMaterials] = useState(null);

  useEffect(() => {
    fetchCourseMaterials();
  }, []);

  const fetchCourseMaterials = async () => {
    try {
      const response = await axios.get(`/api/course-materials/${courseId}`);
      setCourseMaterials(response.data);
    } catch (error) {
      console.error('Error fetching course materials:', error);
    }
  };

  return (
    <div>
      {courseMaterials ? (
        <div>
          <h2>Question Banks</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseMaterials.questionBanks.map((questionBank, index) => (
                  <TableRow key={index}>
                    <TableCell>{questionBank.name}</TableCell>
                    <TableCell>
                      <a href={questionBank.link} target="_blank" rel="noopener noreferrer">
                        {questionBank.link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h2>Reference Textbooks</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseMaterials.referenceTextbooks.map((textbook, index) => (
                  <TableRow key={index}>
                    <TableCell>{textbook.name}</TableCell>
                    <TableCell>
                      <a href={textbook.link} target="_blank" rel="noopener noreferrer">
                        {textbook.link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p>Loading course materials...</p>
      )}
    </div>
  );
};

export default QuestionBankAndTextbooks;
