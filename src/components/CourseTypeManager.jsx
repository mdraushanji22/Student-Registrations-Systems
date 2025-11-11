import React, { useState } from 'react';
import { useAppContext } from '../data/AppContext';

const CourseTypeManager = () => {
  const { courseTypes, addCourseType, updateCourseType, deleteCourseType } = useAppContext();
  const [newCourseTypeName, setNewCourseTypeName] = useState('');
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

  const handleAddCourseType = (e) => {
    e.preventDefault();
    const validationError = validateName(newCourseTypeName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check for duplicates
    if (courseTypes.some(ct => ct.name.toLowerCase() === newCourseTypeName.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    
    addCourseType(newCourseTypeName.trim());
    setNewCourseTypeName('');
    setError('');
  };

  const handleUpdateCourseType = (id) => {
    const validationError = validateName(editName);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Check for duplicates
    if (courseTypes.some(ct => ct.id !== id && ct.name.toLowerCase() === editName.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    
    updateCourseType(id, editName.trim());
    setEditingId(null);
    setEditName('');
    setError('');
  };

  const handleDeleteCourseType = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      deleteCourseType(id);
    }
  };

  const startEditing = (id, name) => {
    setEditingId(id);
    setEditName(name);
    setError('');
  };

  return (
    <div className="manager-container">
      <h2>Course Types</h2>
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      {/* Add new course type form */}
      <form onSubmit={handleAddCourseType} className="add-form">
        <input
          type="text"
          value={newCourseTypeName}
          onChange={(e) => {
            setNewCourseTypeName(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter new course type"
        />
        <button type="submit">Add Course Type</button>
      </form>

      {/* Course types list */}
      <div className="list-container">
        {courseTypes.length === 0 ? (
          <p>No course types available.</p>
        ) : (
          <ul className="item-list">
            {courseTypes.map((courseType) => (
              <li key={courseType.id} className="list-item">
                {editingId === courseType.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => {
                        setEditName(e.target.value);
                        if (error) setError('');
                      }}
                    />
                    <button onClick={() => handleUpdateCourseType(courseType.id)}>Save</button>
                    <button onClick={() => {
                      setEditingId(null);
                      setEditName('');
                      setError('');
                    }}>Cancel</button>
                  </div>
                ) : (
                  <div className="item-content">
                    <span>{courseType.name}</span>
                    <div className="actions">
                      <button onClick={() => startEditing(courseType.id, courseType.name)}>Edit</button>
                      <button onClick={() => handleDeleteCourseType(courseType.id)}>Delete</button>
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

export default CourseTypeManager;