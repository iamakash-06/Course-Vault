import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styled } from '@mui/system';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const StudentCheckbox = styled(FormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const FacultyAttendanceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [studentIds, setStudentIds] = useState([]);

  useEffect(() => {
    // Fetch student IDs from the backend when the component mounts
    fetchStudentIds();
  }, []);

  const fetchStudentIds = async () => {
    try {
      const response = await axios.get('/api/students');
      const { studentIds } = response.data;
      setStudentIds(studentIds);
    } catch (error) {
      console.error('Error fetching student IDs:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    studentIds: Yup.array().min(1, 'Please select at least one student.'),
    date: Yup.date().required('Date is required'),
    period: Yup.string().required('Period is required'),
  });

  const formik = useFormik({
    initialValues: {
      studentIds: [],
      date: '',
      period: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await axios.post('/api/attendance', values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Attendance added successfully');
        formik.resetForm();
      } catch (error) {
        console.error('Error adding attendance:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCheckboxChange = (studentId, checked) => {
    const { studentIds } = formik.values;
    const updatedStudentIds = checked
      ? [...studentIds, studentId]
      : studentIds.filter((id) => id !== studentId);

    formik.setFieldValue('studentIds', updatedStudentIds);
  };

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    const allStudentIds = checked ? studentIds : [];

    formik.setFieldValue('studentIds', allStudentIds);
  };

  const isAllSelected = formik.values.studentIds.length === studentIds.length;

return (
  <div className="container">
    <h2 className="mt-4">Faculty Attendance Form</h2>
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        id="date"
        name="date"
        type="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
        sx={{ marginRight: 2 }}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Period</InputLabel>
        <Select
          id="period"
          name="period"
          labelId="demo-simple-select-label"
          value={formik.values.period}
          label="Period"
          onChange={formik.handleChange}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <TableContainer sx={{ marginBottom: 2 }}>
      <FormControlLabel
        control={<Checkbox checked={isAllSelected} onChange={handleSelectAll} />}
        label="Select All"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentIds.map((student) => (
            <TableRow key={student._id}>
              <TableCell>
                <Checkbox
                  checked={formik.values.studentIds.includes(student._id)}
                  onChange={(event) =>
                    handleCheckboxChange(student._id, event.target.checked)
                  }
                />
              </TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{student.class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button
      variant="contained"
      color="primary"
      onClick={formik.handleSubmit}
      disabled={isLoading}
      sx={{ marginTop: 2 }}
    >
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        'Submit Attendance'
      )}
    </Button>
  </div>
);
};

export default FacultyAttendanceForm;