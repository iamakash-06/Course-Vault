import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAttendanceSummary = ({ studentId }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`/api/attendance/student/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAttendanceData();
}, [studentId]);

const calculateAttendancePercentage = () => {
  if (attendanceData && attendanceData.length > 0) {
    const totalClasses = attendanceData.length;
    const attendedClasses = attendanceData.filter((record) => record.isPresent).length;
    return ((attendedClasses / totalClasses) * 100).toFixed(2);
  }
  return 'N/A';
};

return (
  <div className="container">
    <h2 className="mt-4">Student Attendance Summary</h2>
    <p className="mb-2">Student ID: {studentId}</p>
    <p className="mb-2">Attendance Percentage: {calculateAttendancePercentage()}%</p>
    <p className="mb-2">Classes Attended: {attendanceData ? attendanceData.filter((record) => record.isPresent).length : 'N/A'}</p>
    <p className="mb-2">Total Classes: {attendanceData ? attendanceData.length : 'N/A'}</p>
    {isLoading && <p>Loading attendance data...</p>}
  </div>
);
};

export default StudentAttendanceSummary;

