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
  fetchProducts();
});

document.addEventListener('DOMContentLoaded', function() {
  const productList = document.getElementById('product-list');

  // Función para mostrar la lista de productos
  function displayProductList(products) {
    productList.innerHTML = '';
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - ${product.description} - Stock: ${product.stock}`;
      productList.appendChild(listItem);
    });
  }

  // Función para obtener los productos de la base de datos
  function fetchProducts() {
    const query = 'SELECT * FROM products';
    connection.query(query, (err, results) => {
      if (err) throw err;
      displayProductList(results);
    });
  }
});