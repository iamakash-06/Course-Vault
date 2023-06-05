import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

function AssessmentPlan() {
  const [assessmentPlan, setAssessmentPlan] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    fetchAssessmentPlan();
  }, [courseId]);

  const fetchAssessmentPlan = async () => {
    try {
      const response = await axios.get(`/api/assessment-plan/${courseId}`);
      setAssessmentPlan(response.data);
    } catch (error) {
      console.error('Error fetching assessment plan:', error);
    }
  };

  const downloadAsPdf = () => {
    const input = document.getElementById('assessment-plan-table');
    const options = {
      filename: 'assessment-plan.pdf',
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
        <Table id="assessment-plan-table">
          <TableHead>
            <TableRow>
              <TableCell>Assessment Date and Time</TableCell>
              <TableCell>Assessment Name</TableCell>
              <TableCell>Portions of the Assessment</TableCell>
              <TableCell>Weightage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assessmentPlan.map((assessment) => (
              <TableRow key={assessment._id}>
                <TableCell>{assessment.assessmentDateTime}</TableCell>
                <TableCell>{assessment.assessmentName}</TableCell>
                <TableCell>{assessment.portions}</TableCell>
                <TableCell>{assessment.weightage}</TableCell>
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
}

export default AssessmentPlan;
