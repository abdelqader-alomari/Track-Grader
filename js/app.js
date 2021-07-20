'use strict';

let globVar = document.getElementById('tableId');
let table = document.createElement('table');
globVar.appendChild(table);
Student.all = [];

function Student(name, course, grade = randomGrade(), status = ifPass(grade)) {
    this.name = name;
    this.course = course;
    this.grade = grade;
    this.status = status;

    Student.all.push(this);
}

function randomGrade() {
    return Math.floor((Math.random() * 100) + 0);
};

function ifPass(grade) {
    let theGrade = 0;

    if (grade >= 50) {
        theGrade = 'PASS';
    } else if (grade < 50) {
        theGrade = 'FAIL';
    }
    return theGrade;
};

function headerRender() {
    let row = document.createElement('tr');
    table.appendChild(row);
    let rowHeader = document.createElement('th');
    row.appendChild(rowHeader);
    rowHeader.textContent = 'Student Name';

    let rowHeader2 = document.createElement('th');
    row.appendChild(rowHeader2);
    rowHeader2.textContent = 'Student Grade';

    let rowHeader3 = document.createElement('th');
    row.appendChild(rowHeader3);
    rowHeader3.textContent = 'Course';

    let rowHeader4 = document.createElement('th');
    row.appendChild(rowHeader4);
    rowHeader4.textContent = 'Status';
}
headerRender();

Student.prototype.render = function () {
    let row = document.createElement('tr');
    table.appendChild(row);
    let rowData = document.createElement('td');
    row.appendChild(rowData);
    rowData.textContent = `${this.name}`;

    let rowData2 = document.createElement('td');
    row.appendChild(rowData2);
    rowData2.textContent = `${this.grade}`;

    let rowData3 = document.createElement('td');
    row.appendChild(rowData3);
    rowData3.textContent = `${this.course}`;

    let rowData4 = document.createElement('td');
    row.appendChild(rowData4);
    rowData4.textContent = `${this.status}`
}
let form = document.getElementById('form');
form.addEventListener('submit', submitting);

function submitting(event) {
    event.preventDefault();
    let name = event.target.name.value;
    let course = event.target.course.value;

    let newStudent = new Student(name, course);
    newStudent.render();
    settingItems();
}

function settingItems() {
    localStorage.setItem('allGrades', JSON.stringify(Student.all))
}

function gettingItems() {
    let newData = JSON.parse(localStorage.getItem('allGrades'));

    if (newData) {
        for (let i = 0; i < newData.length; i++) {
            let reInst = new Student(newData[i].name, newData[i].course, newData[i].grade, newData[i].status);
            reInst.render();
        }
    }
}
gettingItems();