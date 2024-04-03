// Validar contraseña de empleado
function validateEmployeePassword(password, hashedPassword, callback) {
    const bcrypt = require('bcrypt');
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, isMatch);
      }
    });
  }
  
  // Validar campos numéricos
  function validateNumericField(value, callback) {
    if (isNaN(value) || value < 0) {
      callback(new Error('El valor debe ser un número mayor o igual a cero'));
    } else {
      callback(null, true);
    }
  }
  
  // Validar campos vacíos
  function validateRequiredFields(fields, callback) {
    const emptyFields = fields.filter(field => !field);
    if (emptyFields.length > 0) {
      callback(new Error('Por favor, complete todos los campos'));
    } else {
      callback(null, true);
    }
  }
  
  // Exportar las funciones de validación
  module.exports = {
    validateEmployeePassword,
    validateNumericField,
    validateRequiredFields
  };