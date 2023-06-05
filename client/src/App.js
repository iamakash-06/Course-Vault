import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Fotp from './components/Fotp';
import CDash from './components/CDash';
import LectureTable from './components/LectureTable';
import LecturePlan from './components/LecturePlan';


/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Dash from './components/Dash';
import CourseDescription from './components/CourseDescription';
import AssessmentPlan from './components/AssessmentPlan';
import FeedbackForm from './components/FeedbackForm';
import GradesAndScores from './components/GradesAndScores';
import QuestionBankAndTextbooks from './components/QuestionBankAndTextbooks';

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
    {
        path : '/fotp',
        element : <Fotp></Fotp>
    },
    {
        path: '/dash',
        element: <Dash></Dash>
    },
    {
        path: '/courses/:courseId',
        element: <CDash></CDash>
    },
    {
        path: '/courses/:courseId/lecture',
        element: <LectureTable></LectureTable>
    },
    {
        path: '/courses/:courseId/lp',
        element: <LecturePlan></LecturePlan>
    },
    {
        path: '/courses/:courseId/ap',
        element: <AssessmentPlan></AssessmentPlan>
    },
    {
        path: '/feedback',
        element: <FeedbackForm></FeedbackForm>
    },
    {
        path: '/courses/:courseId/grades',
        element: <GradesAndScores></GradesAndScores>
    },
    {
        path: '/courses/:courseId/qb',
        element: <QuestionBankAndTextbooks></QuestionBankAndTextbooks>
    }

])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
