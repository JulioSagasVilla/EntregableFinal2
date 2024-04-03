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
  fetchSuppliers();
});

document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.getElementById('order-form');
  const productIdInput = document.getElementById('product-id');
  const productNameInput = document.getElementById('product-name');
  const supplierSelect = document.getElementById('supplier');
  const quantityInput = document.getElementById('quantity');

  // Simulación de obtener el ID del producto para realizar el pedido
  const productId = 1;

  // Llenar los campos del formulario con los datos del producto
  getProductData(productId);

  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const supplierId = supplierSelect.value;
    const quantity = parseInt(quantityInput.value);

    placeOrder(productId, supplierId, quantity);
  });
});

// Función para obtener los datos del producto desde la base de datos
function getProductData(productId) {
  const query = 'SELECT * FROM products WHERE id = ?';
  connection.query(query, [productId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const productData = results[0];
      productIdInput.value = productData.id;
      productNameInput.value = productData.name;
    } else {
      console.error('Producto no encontrado');
    }
  });
}

// Función para llenar la lista desplegable de proveedores
function fetchSuppliers() {
  const query = 'SELECT * FROM suppliers';
  connection.query(query, (err, results) => {
    if (err) throw err;

    results.forEach(supplier => {
      const option = document.createElement('option');
      option.value = supplier.id;
      option.text = supplier.name;
      supplierSelect.add(option);
    });
  });
}

// Función para realizar el pedido
function placeOrder(productId, supplierId, quantity) {
  // Verificar si existe un pedido pendiente para el mismo producto y proveedor
  const checkQuery = 'SELECT * FROM orders WHERE product_id = ? AND supplier_id = ? AND status = "pending"';
  connection.query(checkQuery, [productId, supplierId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      console.error('Ya existe un pedido pendiente para este producto y proveedor');
      return;
    }

    // Verificar si existe un pedido pendiente para el mismo producto pero diferente proveedor
    const checkOtherQuery = 'SELECT * FROM orders WHERE product_id = ? AND supplier_id != ? AND status = "pending"';
    connection.query(checkOtherQuery, [productId, supplierId], (err, otherResults) => {
      if (err) throw err;

      if (otherResults.length > 0) {
        console.warn('Existe un pedido pendiente para este producto con otro proveedor');
      }

      // Realizar el pedido
      const orderQuery = 'INSERT INTO orders (product_id, supplier_id, quantity) VALUES (?, ?, ?)';
      connection.query(orderQuery, [productId, supplierId, quantity], (err, result) => {
        if (err) throw err;

        console.log('Pedido realizado exitosamente');
      });
    });
  });
}