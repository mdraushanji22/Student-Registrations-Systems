import React, { useState } from 'react';
import { useAppContext } from '../data/AppContext';

const CourseManager = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useAppContext();
  const [newCourseName, setNewCourseName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return null;
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const validationError = validateName(newCourseName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check for duplicates
    if (courses.some(c => c.name.toLowerCase() === newCourseName.trim().toLowerCase())) {
      setError('Course already exists');
      return;
    }
    
    addCourse(newCourseName.trim());
    setNewCourseName('');
    setError('');
  };

  const handleUpdateCourse = (id) => {
    const validationError = validateName(editName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check for duplicates
    if (courses.some(c => c.id !== id && c.name.toLowerCase() === editName.trim().toLowerCase())) {
      setError('Course already exists');
      return;
    }
    
    updateCourse(id, editName.trim());
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditName(name);
    setError('');
  };

  return (
    <div className="manager-container">
      <h2>Courses</h2>
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Add new course form */}
      <form onSubmit={handleAddCourse} className="add-form">
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => {
            setNewCourseName(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter new course"
        />
        <button type="submit">Add Course</button>
      </form>

      {/* Courses list */}
      <div className="list-container">
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul className="item-list">
            {courses.map((course) => (
              <li key={course.id} className="list-item">
                {editingId === course.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => {
                        setEditName(e.target.value);
                        if (error) setError('');
                      }}
                    />
                    <button onClick={() => handleUpdateCourse(course.id)}>Save</button>
                    <button onClick={() => {
                      setEditingId(null);
                      setEditName('');
                      setError('');
                    }}>Cancel</button>
                  </div>
                ) : (
                  <div className="item-content">
                    <span>{course.name}</span>
                    <div className="actions">
                      <button onClick={() => startEditing(course.id, course.name)}>Edit</button>
                      <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
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

export default CourseManager;