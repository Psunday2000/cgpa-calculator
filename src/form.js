import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [rows, setRows] = useState([{ course: 'Course 1', grade: 'A', creditUnit: '' }]);
  const [cgpa, setCGPA] = useState(0);

  const handleCourseChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].course = event.target.value;
    setRows(updatedRows);
  };

  const handleGradeChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].grade = event.target.value;
    setRows(updatedRows);
    calculateCGPA(updatedRows);
  };

  const handleCreditUnitChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].creditUnit = event.target.value.slice(0, 1);
    setRows(updatedRows);
    calculateCGPA(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { course: `Course ${rows.length + 1}`, grade: 'A', creditUnit: '' }]);
  };

  const deleteRow = (index) => {
    setRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const calculateCGPA = (updatedRows) => {
    const totalCreditUnits = updatedRows.reduce((sum, row) => sum + parseInt(row.creditUnit || 0, 10), 0);
    const weightedGrades = updatedRows.reduce(
      (sum, row) => sum + (calculateGradePoint(row.grade) * parseInt(row.creditUnit || 0, 10)),
      0
    );
    const newCGPA = weightedGrades / totalCreditUnits || 0;
    setCGPA(newCGPA.toFixed(2));
  };

  const calculateGradePoint = (grade) => {
    switch (grade) {
      case 'A':
        return 5;
      case 'AB':
        return 4.5;
      case 'B':
        return 4;
      case 'BC':
        return 3.5;
      case 'C':
        return 3;
      case 'CD':
        return 2.5;
      case 'D':
        return 2;
      case 'E':
        return 1;
      case 'F':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="form-group">
      {rows.map((row, index) => (
        <div key={index}>
          <label className='label' htmlFor={`course-${index}`}>Course {index + 1}</label>
          <input
            className='input-text'
            type="text"
            id={`course-${index}`}
            value={row.course}
            onChange={(e) => handleCourseChange(index, e)}
          />

          <label className='label' htmlFor={`grade-${index}`}>Grade</label>
          <select className='input-text' width='80px' id={`grade-${index}`} value={row.grade} onChange={(e) => handleGradeChange(index, e)}>
            <option value="A">A</option>
            <option value="AB">AB</option>
            <option value="B">B</option>
            <option value="BC">BC</option>
            <option value="C">C</option>
            <option value="CD">CD</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>

          <label className='label' htmlFor={`credit-unit-${index}`}>Credit Unit</label>
          <input
            className='input-text'
            type="number"
            id={`credit-unit-${index}`}
            min="0"
            max="9"
            value={row.creditUnit}
            onChange={(e) => handleCreditUnitChange(index, e)}
          />
          <button className='button' onClick={() => deleteRow(index)} ><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></button>
          <button className='button' onClick={handleAddRow}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
        </div>
      ))}
      <div className='cgpa-label-section'>
      <button className='button' onClick={handleAddRow}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
        <h2 className='label'>CGPA: {cgpa}</h2>
      </div>
      
    </div>
  );
};

export default App;
