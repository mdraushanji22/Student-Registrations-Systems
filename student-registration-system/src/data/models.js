// Data models for our student registration system

export class CourseType {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class Course {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class CourseOffering {
  constructor(id, courseId, courseTypeId) {
    this.id = id;
    this.courseId = courseId;
    this.courseTypeId = courseTypeId;
  }
}

export class StudentRegistration {
  constructor(id, studentName, courseOfferingId) {
    this.id = id;
    this.studentName = studentName;
    this.courseOfferingId = courseOfferingId;
  }
}