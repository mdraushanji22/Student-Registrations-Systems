import React, { useState } from 'react';
import './App.css';
import CourseTypeManager from './components/CourseTypeManager';
import CourseManager from './components/CourseManager';
import CourseOfferingManager from './components/CourseOfferingManager';
import StudentRegistrationManager from './components/StudentRegistrationManager';

function App() {
  const [activeTab, setActiveTab] = useState('courseTypes');

  return (
    <div className="App">
      <header>
        <h1>Student Registration System</h1>
      </header>
      
      <nav>
        <button 
          className={activeTab === 'courseTypes' ? 'active' : ''}
          onClick={() => setActiveTab('courseTypes')}
        >
          Course Types
        </button>
        <button 
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button 
          className={activeTab === 'courseOfferings' ? 'active' : ''}
          onClick={() => setActiveTab('courseOfferings')}
        >
          Course Offerings
        </button>
        <button 
          className={activeTab === 'registrations' ? 'active' : ''}
          onClick={() => setActiveTab('registrations')}
        >
          Student Registrations
        </button>
      </nav>
      
      <main>
        {activeTab === 'courseTypes' && <CourseTypeManager />}
        {activeTab === 'courses' && <CourseManager />}
        {activeTab === 'courseOfferings' && <CourseOfferingManager />}
        {activeTab === 'registrations' && <StudentRegistrationManager />}
      </main>
    </div>
  );
}

export default App;