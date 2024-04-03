const validations = require('./validations');
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'badthings2',
  database: 'supermarket_inventory'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const employeeId = document.getElementById('employee-id').value;
    const password = document.getElementById('password').value;

    authenticateEmployee(employeeId, password);
  });
});

function authenticateEmployee(employeeId, password) {
  const query = 'SELECT * FROM employees WHERE employee_id = ?';
  connection.query(query, [employeeId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const employee = results[0];
      if (employee.password === password) {
        console.log('Autenticación exitosa');
        window.location.href = 'inventory.html';
      } else {
        console.log('Autenticación fallida');
        alert('ID de empleado o contraseña incorrectos');
      }
    } else {
      console.log('Autenticación fallida');
      alert('ID de empleado o contraseña incorrectos');
    }
  });
}