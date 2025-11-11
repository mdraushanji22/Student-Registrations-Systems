import React, { useState } from 'react';
import { useAppContext } from '../data/AppContext';

const StudentRegistrationManager = () => {
  const { 
    studentRegistrations, 
    courseOfferings, 
    courseTypes,
    addStudentRegistration,
    getRegistrationsForOffering,
    getCourseOfferingsByType,
    getCourseName,
    getCourseTypeName
  } = useAppContext();
  
  const [studentName, setStudentName] = useState('');
  const [selectedCourseOfferingId, setSelectedCourseOfferingId] = useState('');
  const [filterCourseTypeId, setFilterCourseTypeId] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState(null);
  const [error, setError] = useState('');

  const validateRegistration = (name, offeringId) => {
    if (!name || name.trim().length === 0) {
      return 'Student name is required';
    }
    if (name.trim().length < 2) {
      return 'Student name must be at least 2 characters long';
    }
    if (!offeringId) {
      return 'Please select a course offering';
    }
    return null;
  };

  const handleRegisterStudent = (e) => {
    e.preventDefault();
    const validationError = validateRegistration(studentName, selectedCourseOfferingId);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    addStudentRegistration(studentName.trim(), parseInt(selectedCourseOfferingId));
    setStudentName('');
    setSelectedCourseOfferingId('');
    setError('');
  };

  const getFullCourseOfferingName = (courseId, courseTypeId) => {
    return `${getCourseTypeName(courseTypeId)} - ${getCourseName(courseId)}`;
  };

  // Filter course offerings based on selected course type
  const filteredCourseOfferings = filterCourseTypeId 
    ? getCourseOfferingsByType(parseInt(filterCourseTypeId))
    : courseOfferings;

  // Get registrations for the selected offering
  const registrationsForSelectedOffering = selectedOfferingId
    ? getRegistrationsForOffering(selectedOfferingId)
    : [];

  return (
    <div className="manager-container">
      <h2>Student Registrations</h2>
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Filter by course type */}
      <div className="filter-section">
        <label htmlFor="courseTypeFilter">Filter by Course Type:</label>
        <select 
          id="courseTypeFilter"
          value={filterCourseTypeId} 
          onChange={(e) => setFilterCourseTypeId(e.target.value)}
        >
          <option value="">All Types</option>
          {courseTypes.map(courseType => (
            <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
          ))}
        </select>
        <button onClick={() => {
          setFilterCourseTypeId('');
          setSelectedOfferingId(null);
        }}>Clear Filter</button>
      </div>
      
      {/* Register student form */}
      <form onSubmit={handleRegisterStudent} className="add-form">
        <input
          type="text"
          value={studentName}
          onChange={(e) => {
            setStudentName(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter student name"
        />
        
        <select 
          value={selectedCourseOfferingId} 
          onChange={(e) => {
            setSelectedCourseOfferingId(e.target.value);
            if (error) setError('');
          }}
        >
          <option value="">Select Course Offering</option>
          {filteredCourseOfferings.map(offering => (
            <option key={offering.id} value={offering.id}>
              {getFullCourseOfferingName(offering.courseId, offering.courseTypeId)}
            </option>
          ))}
        </select>
        
        <button type="submit">Register Student</button>
      </form>

      {/* Available course offerings list */}
      <div className="list-container">
        <h3>Available Course Offerings</h3>
        {filteredCourseOfferings.length === 0 ? (
          <p>No course offerings available.</p>
        ) : (
          <ul className="item-list">
            {filteredCourseOfferings.map((offering) => (
              <li key={offering.id} className="list-item">
                <div className="item-content">
                  <span>{getFullCourseOfferingName(offering.courseId, offering.courseTypeId)}</span>
                  <button onClick={() => setSelectedOfferingId(
                    selectedOfferingId === offering.id ? null : offering.id
                  )}>
                    {selectedOfferingId === offering.id ? 'Hide Registrations' : 'Show Registrations'}
                  </button>
                </div>
                
                {/* Show registrations for this offering when selected */}
                {selectedOfferingId === offering.id && (
                  <div className="registrations-list">
                    <h4>Registered Students:</h4>
                    {registrationsForSelectedOffering.length === 0 ? (
                      <p>No students registered for this offering.</p>
                    ) : (
                      <ul>
                        {registrationsForSelectedOffering.map(registration => (
                          <li key={registration.id}>{registration.studentName}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentRegistrationManager;