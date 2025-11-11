# Student Registration System

A simple student registration system built with React, Vite, JavaScript, and CSS.

## Features

- **Course Types Management**
  - Create, read, update, and delete course types (e.g., Individual, Group, Special)

- **Courses Management**
  - Create, read, update, and delete courses (e.g., Hindi, English, Urdu)

- **Course Offerings Management**
  - Create course offerings by associating a course with a course type
  - List all available course offerings
  - Update the association between a course and course type
  - Delete existing course offerings

- **Student Registrations**
  - Allow students to register for available course offerings
  - List all registered students for a specific course offering
  - Filter course offerings based on the selected course type

## Technical Requirements

- **Frontend**: React with Vite
- **Styling**: Pure CSS (no external libraries)
- **State Management**: React Context API
- **Responsive Design**: Works on different devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd student-registration-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/              # React components
├── data/                   # Data models and context
├── App.css                 # Main stylesheet
├── App.jsx                 # Main application component
└── main.jsx                # Entry point
```

## Data Models

- **CourseType**: Represents different types of courses (Individual, Group, Special)
- **Course**: Represents actual courses (Hindi, English, Urdu)
- **CourseOffering**: Associates a course with a course type
- **StudentRegistration**: Represents a student's registration for a course offering

## Features Implemented

1. **CRUD Operations**: Full Create, Read, Update, and Delete functionality for all entities
2. **Data Validation**: Form validation with error handling
3. **Responsive Design**: Mobile-friendly layout
4. **Filtering**: Filter course offerings by course type
5. **Relationship Management**: Proper handling of relationships between entities

## Technical Details

- Uses React Context API for state management
- Implements form validation and error handling
- Responsive design with pure CSS
- Clean, modular component structure

## License

This project is licensed under the MIT License.