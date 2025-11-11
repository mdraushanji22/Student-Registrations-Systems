import React, { createContext, useContext, useState } from 'react';
import { CourseType, Course, CourseOffering, StudentRegistration } from './models';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  // Initialize with some sample data
  const [courseTypes, setCourseTypes] = useState([
    new CourseType(1, 'Individual'),
    new CourseType(2, 'Group'),
    new CourseType(3, 'Special')
  ]);

  const [courses, setCourses] = useState([
    new Course(1, 'Hindi'),
    new Course(2, 'English'),
    new Course(3, 'Urdu')
  ]);

  const [courseOfferings, setCourseOfferings] = useState([
    new CourseOffering(1, 1, 2), // Group - Hindi
    new CourseOffering(2, 2, 1)  // Individual - English
  ]);

  const [studentRegistrations, setStudentRegistrations] = useState([
    new StudentRegistration(1, 'John Doe', 1),
    new StudentRegistration(2, 'Jane Smith', 2)
  ]);

  // Course Type CRUD operations
  const addCourseType = (name) => {
    const newId = courseTypes.length > 0 ? Math.max(...courseTypes.map(ct => ct.id)) + 1 : 1;
    const newCourseType = new CourseType(newId, name);
    setCourseTypes([...courseTypes, newCourseType]);
  };

  const updateCourseType = (id, name) => {
    setCourseTypes(courseTypes.map(ct => ct.id === id ? new CourseType(id, name) : ct));
  };

  const deleteCourseType = (id) => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    // Also remove any course offerings that use this course type
    setCourseOfferings(courseOfferings.filter(co => co.courseTypeId !== id));
  };

  // Course CRUD operations
  const addCourse = (name) => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourse = new Course(newId, name);
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id, name) => {
    setCourses(courses.map(c => c.id === id ? new Course(id, name) : c));
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    // Also remove any course offerings that use this course
    setCourseOfferings(courseOfferings.filter(co => co.courseId !== id));
  };

  // Course Offering CRUD operations
  const addCourseOffering = (courseId, courseTypeId) => {
    const newId = courseOfferings.length > 0 ? Math.max(...courseOfferings.map(co => co.id)) + 1 : 1;
    const newCourseOffering = new CourseOffering(newId, courseId, courseTypeId);
    setCourseOfferings([...courseOfferings, newCourseOffering]);
  };

  const updateCourseOffering = (id, courseId, courseTypeId) => {
    setCourseOfferings(courseOfferings.map(co => co.id === id ? new CourseOffering(id, courseId, courseTypeId) : co));
  };

  const deleteCourseOffering = (id) => {
    setCourseOfferings(courseOfferings.filter(co => co.id !== id));
    // Also remove any student registrations for this offering
    setStudentRegistrations(studentRegistrations.filter(sr => sr.courseOfferingId !== id));
  };

  // Student Registration operations
  const addStudentRegistration = (studentName, courseOfferingId) => {
    const newId = studentRegistrations.length > 0 ? Math.max(...studentRegistrations.map(sr => sr.id)) + 1 : 1;
    const newRegistration = new StudentRegistration(newId, studentName, courseOfferingId);
    setStudentRegistrations([...studentRegistrations, newRegistration]);
  };

  const getRegistrationsForOffering = (courseOfferingId) => {
    return studentRegistrations.filter(sr => sr.courseOfferingId === courseOfferingId);
  };

  const getCourseOfferingsByType = (courseTypeId) => {
    return courseOfferings.filter(co => co.courseTypeId === courseTypeId);
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  const getCourseTypeName = (courseTypeId) => {
    const courseType = courseTypes.find(ct => ct.id === courseTypeId);
    return courseType ? courseType.name : 'Unknown Type';
  };

  const value = {
    // Data
    courseTypes,
    courses,
    courseOfferings,
    studentRegistrations,
    
    // Course Type operations
    addCourseType,
    updateCourseType,
    deleteCourseType,
    
    // Course operations
    addCourse,
    updateCourse,
    deleteCourse,
    
    // Course Offering operations
    addCourseOffering,
    updateCourseOffering,
    deleteCourseOffering,
    
    // Student Registration operations
    addStudentRegistration,
    getRegistrationsForOffering,
    getCourseOfferingsByType,
    
    // Helper functions
    getCourseName,
    getCourseTypeName
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};