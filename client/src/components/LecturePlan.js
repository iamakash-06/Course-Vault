import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const LecturePlan = () => {
    const [lecturePlan, setLecturePlan] = useState([]);
    const { courseId } = useParams();
  
    useEffect(() => {
      fetchLecturePlan();
    }, [courseId]);
  
    const fetchLecturePlan = async () => {
      try {
        const response = await axios.get(`/api/lecture-plan/${courseId}`);
        setLecturePlan(response.data);
      } catch (error) {
        console.error('Error fetching lecture plan:', error);
      }
    };

    const downloadAsPdf = () => {
        const input = document.getElementById('lecture-plan-table');
        const options = {
          filename: 'lecture-plan.pdf',
          margin: 10,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
      
        html2pdf().set(options).from(input).save();
      };
      

  return (
    <div>
      <TableContainer component={Paper}>
        <Table id="lecture-plan-table">
          <TableHead>
            <TableRow>
              <TableCell>Lecture No</TableCell>
              <TableCell>Lecture Name</TableCell>
              <TableCell>Topics to be Covered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lecturePlan.map((lecture) => (
              <TableRow key={lecture._id}>
                <TableCell>{lecture.lectureNo}</TableCell>
                <TableCell>{lecture.lectureName}</TableCell>
                <TableCell>{lecture.topics}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={downloadAsPdf}>
        Download as PDF
      </Button>
    </div>
  );
};

export default LecturePlan;