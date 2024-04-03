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
  const form = document.getElementById('edit-form');
  const cancelButton = document.getElementById('cancel-button');
  const saveButton = document.getElementById('save-button');

  // Obtener los datos del producto desde la base de datos
  const productId = 1; // Reemplaza con el ID del producto que deseas editar
  getProductData(productId);

  // Agregar event listeners para los botones
  cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Edición cancelada');
  });

  saveButton.addEventListener('click', function(event) {
    event.preventDefault();
    const newProductData = {
      id: parseInt(document.getElementById('product-id').value),
      name: document.getElementById('product-name').value,
      description: document.getElementById('product-description').value,
      category: document.getElementById('product-category').value,
      stock: parseInt(document.getElementById('product-stock').value)
    };

    saveChangesToDatabase(newProductData);
  });
});

// Función para obtener los datos del producto desde la base de datos
function getProductData(productId) {
  const query = 'SELECT * FROM products WHERE id = ?';
  connection.query(query, [productId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const productData = results[0];
      document.getElementById('product-id').value = productData.id;
      document.getElementById('product-name').value = productData.name;
      document.getElementById('product-description').value = productData.description;
      document.getElementById('product-category').value = productData.category;
      document.getElementById('product-stock').value = productData.stock;
    } else {
      console.error('Producto no encontrado');
    }
  });
}

// Función para guardar los cambios del producto en la base de datos
function saveChangesToDatabase(newProductData) {
  const query = 'UPDATE products SET name = ?, description = ?, category = ?, stock = ? WHERE id = ?';
  const values = [
    newProductData.name,
    newProductData.description,
    newProductData.category,
    newProductData.stock,
    newProductData.id
  ];

  connection.query(query, values, (err, result) => {
    if (err) throw err;

    console.log('Cambios guardados exitosamente');
  });
}