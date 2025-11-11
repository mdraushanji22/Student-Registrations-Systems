import React, { useState } from 'react';
import { useAppContext } from '../data/AppContext';

const CourseOfferingManager = () => {
  const { 
    courseOfferings, 
    courses, 
    courseTypes, 
    addCourseOffering, 
    updateCourseOffering, 
    deleteCourseOffering,
    getCourseName,
    getCourseTypeName
  } = useAppContext();
  
  const [newCourseId, setNewCourseId] = useState('');
  const [newCourseTypeId, setNewCourseTypeId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCourseId, setEditCourseId] = useState('');
  const [editCourseTypeId, setEditCourseTypeId] = useState('');
  const [error, setError] = useState('');

  const validateSelection = (courseId, courseTypeId) => {
    if (!courseId) {
      return 'Please select a course';
    }
    if (!courseTypeId) {
      return 'Please select a course type';
    }
    return null;
  };

  const handleAddCourseOffering = (e) => {
    e.preventDefault();
    const validationError = validateSelection(newCourseId, newCourseTypeId);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check for duplicates
    const courseId = parseInt(newCourseId);
    const courseTypeId = parseInt(newCourseTypeId);
    
    if (courseOfferings.some(co => co.courseId === courseId && co.courseTypeId === courseTypeId)) {
      setError('This course offering already exists');
      return;
    }
    
    addCourseOffering(courseId, courseTypeId);
    setNewCourseId('');
    setNewCourseTypeId('');
    setError('');
  };

  const handleUpdateCourseOffering = (id) => {
    const validationError = validateSelection(editCourseId, editCourseTypeId);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    const courseId = parseInt(editCourseId);
    const courseTypeId = parseInt(editCourseTypeId);
    
    // Check for duplicates
    if (courseOfferings.some(co => co.id !== id && co.courseId === courseId && co.courseTypeId === courseTypeId)) {
      setError('This course offering already exists');
      return;
    }
    
    updateCourseOffering(id, courseId, courseTypeId);
    setEditingId(null);
    setEditCourseId('');
    setEditCourseTypeId('');
    setError('');
  };

  const handleDeleteCourseOffering = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      deleteCourseOffering(id);
    }
  };

  const startEditing = (id, courseId, courseTypeId) => {
    setEditingId(id);
    setEditCourseId(courseId.toString());
    setEditCourseTypeId(courseTypeId.toString());
    setError('');
  };

  const getFullCourseOfferingName = (courseId, courseTypeId) => {
    return `${getCourseTypeName(courseTypeId)} - ${getCourseName(courseId)}`;
  };

  return (
    <div className="manager-container">
      <h2>Course Offerings</h2>
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Add new course offering form */}
      <form onSubmit={handleAddCourseOffering} className="add-form">
        <select 
          value={newCourseId} 
          onChange={(e) => {
            setNewCourseId(e.target.value);
            if (error) setError('');
          }}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
        
        <select 
          value={newCourseTypeId} 
          onChange={(e) => {
            setNewCourseTypeId(e.target.value);
            if (error) setError('');
          }}
        >
          <option value="">Select Course Type</option>
          {courseTypes.map(courseType => (
            <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
          ))}
        </select>
        
        <button type="submit">Add Course Offering</button>
      </form>

      {/* Course offerings list */}
      <div className="list-container">
        {courseOfferings.length === 0 ? (
          <p>No course offerings available.</p>
        ) : (
          <ul className="item-list">
            {courseOfferings.map((offering) => (
              <li key={offering.id} className="list-item">
                {editingId === offering.id ? (
                  <div className="edit-form">
                    <select 
                      value={editCourseId} 
                      onChange={(e) => {
                        setEditCourseId(e.target.value);
                        if (error) setError('');
                      }}
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                    
                    <select 
                      value={editCourseTypeId} 
                      onChange={(e) => {
                        setEditCourseTypeId(e.target.value);
                        if (error) setError('');
                      }}
                    >
                      <option value="">Select Course Type</option>
                      {courseTypes.map(courseType => (
                        <option key={courseType.id} value={courseType.id}>{courseType.name}</option>
                      ))}
                    </select>
                    
                    <button onClick={() => handleUpdateCourseOffering(offering.id)}>Save</button>
                    <button onClick={() => {
                      setEditingId(null);
                      setEditCourseId('');
                      setEditCourseTypeId('');
                      setError('');
                    }}>Cancel</button>
                  </div>
                ) : (
                  <div className="item-content">
                    <span>{getFullCourseOfferingName(offering.courseId, offering.courseTypeId)}</span>
                    <div className="actions">
                      <button onClick={() => startEditing(offering.id, offering.courseId, offering.courseTypeId)}>Edit</button>
                      <button onClick={() => handleDeleteCourseOffering(offering.id)}>Delete</button>
                    </div>
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

export default CourseOfferingManager;