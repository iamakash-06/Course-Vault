import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import Lecture from './model/lecture.js';
import Box from './model/box.js';
import LecturePlan from './model/lecturePlan.js';
import AssessmentPlan from './model/assessmentPlan.js';
import Grade from './model/grade.js';
import CourseMaterial from './model/courseMaterial.js';

const app = express();

import mongoose from 'mongoose';

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

const port = 8080;

/** HTTP GET Request */
app.get('/', (req, res) => {
  res.status(201).json("Home GET Request");
});

/** api routes */
app.use('/api', router);

// Retrieve all lectures
router.get('/lectures', (req, res) => {
  Lecture.find()
    .then((lectures) => {
      res.json(lectures);
    })
    .catch((error) => {
      console.error('Error fetching lectures:', error);
      res.status(500).json({ error: 'Failed to fetch lectures' });
    });
});

app.get('/api/grades/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const grade = await Grade.findOne({ courseId });
    res.json(grade);
  } catch (error) {
    console.error('Error retrieving grades:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Retrieve lectures for a specific courseId
router.get('/courses/:courseId/lectures', (req, res) => {
  const { courseId } = req.params;

  Lecture.find({ courseId })
    .then((lectures) => {
      res.json(lectures);
    })
    .catch((error) => {
      console.error('Error fetching lectures:', error);
      res.status(500).json({ error: 'Failed to fetch lectures' });
    });
});

// Define an API endpoint to fetch the box data
app.get('/api/boxes', async (req, res) => {
  try {
    const { semester } = req.query;
    let query = {};

    // Check if the semester query parameter is provided
    if (semester) {
      query = { semester };
    }

    // Fetch the box data from MongoDB Atlas, filtered by semester if provided
    const boxes = await Box.find(query);
    res.json(boxes);
  } catch (error) {
    console.error('Error fetching box data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/api/course-materials/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const courseMaterials = await CourseMaterial.findOne({ courseId });
    res.json(courseMaterials);
  } catch (error) {
    console.error('Error retrieving course materials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/lecture-plan/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const lecturePlan = await LecturePlan.find({ courseId });
    res.json(lecturePlan);
  } catch (error) {
    console.error('Error retrieving lecture plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/assessment-plan/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const assessmentPlan = await AssessmentPlan.find({ courseId });
    res.json(assessmentPlan);
  } catch (error) {
    console.error('Error retrieving assessment plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/courses/:courseId', (req, res) => {
  // Retrieve the courseId from the request parameters
  const courseId = req.params.courseId;

  // Here, you can use the courseId to fetch the course data from your database
  // Replace the placeholder code below with your actual implementation

  // Example placeholder code
  const course = {
    _id: courseId,
    title: 'Course Title',
    description: 'Course Description',
  };

  // Return the course data as a response
  res.json(course);
});

/** start server only when we have a valid connection */
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Invalid database connection...!');
  });
