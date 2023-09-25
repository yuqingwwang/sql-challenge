const db = require("./database/db.js");

const select_cohorts_in_finsbo = db.prepare(/*sql*/ `
  Select cohorts.name
  From cohorts
  Where cohorts.location = 'Finsbury Park';
`);

function listCohortsInFinsbo() {
  return select_cohorts_in_finsbo.all();
}

const select_students_in_finsbo = db.prepare(/*sql*/ `
  SELECT students.username
  FROM students
  JOIN cohorts on cohorts.name = students.cohort_name
  WHERE cohorts.location = 'Finsbury Park';
`);

function listStudentsInFinsbo() {
  return select_students_in_finsbo.all();
}

const select_students_with_location = db.prepare(/*sql*/ `
  SELECT students.username, cohorts.location
  FROM students
  JOIN cohorts on cohorts.name = students.cohort_name
`);

function listStudentsWithLocation() {
  return select_students_with_location.all();
}

const select_students_with_projects = db.prepare(/*sql*/ `
  Select projects.name, students_projects.student_username as username
  From projects
  JOIN students_projects on projects.id = students_projects.project_id
`);

function listStudentsWithProjects() {
  return select_students_with_projects.all();
}

const select_students_with_projects_in_finsbo = db.prepare(/*sql*/ `
Select projects.name, students_projects.student_username as username
From projects
JOIN students_projects on projects.id = students_projects.project_id
JOIN students on students.username = students_projects.student_username
JOIN cohorts on cohorts.name = students.cohort_name
WHERE cohorts.location = 'Finsbury Park'
ORDER BY username
`);

function listStudentsWithProjectsInFinsbo() {
  return select_students_with_projects_in_finsbo.all();
}

module.exports = {
  listCohortsInFinsbo,
  listStudentsInFinsbo,
  listStudentsWithLocation,
  listStudentsWithProjects,
  listStudentsWithProjectsInFinsbo,
};
