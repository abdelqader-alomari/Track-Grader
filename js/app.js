'use strict';

let globVar = document.getElementById('tableId');
let table = document.createElement('table');
globVar.appendChild(table);
let number = 50;
let allStudent = [];

function Student(name, course) {
    this.name = name;
    this.course = course;

    allStudent.push(this);
}

let studentGrade = function randomGrade() {
    return Math.floor((Math.random() * 100) + 0);
}

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
    rowData2.textContent = `${studentGrade()}`;

    let rowData3 = document.createElement('td');
    row.appendChild(rowData3);
    rowData3.textContent = `${this.course}`;

    let rowData4 = document.createElement('td');
    row.appendChild(rowData4);
    if (studentGrade() >= number) {
        rowData4.textContent = 'PASS';
    } else {
        rowData4.textContent = 'FAIL';
    }
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
    let ConvertArray = JSON.stringify(allStudent);
    localStorage.setItem('allGrades', ConvertArray);
}

function gettingItems() {
    let data = localStorage.getItem('allGrades')
    let newData = JSON.parse(data);

    if (newData) {
        for (let i = 0; i < newData.length; i++)
            var reInst = new Student(newData[i].name, newData[i].course)
        reInst.render();
    }
}
gettingItems();