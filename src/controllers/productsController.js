const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    res.render('products', { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    const id = req.params.id;
    const product = products.find((item) => item.id == id);
    res.render('detail', { product, toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    res.render('product-create-form');
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    let ultimoProducto = products.pop();
    //Nueva ID del producto creado
    let nuevaID = ultimoProducto.id + 1;
    //Agregar el producto extraido
    products.push(ultimoProducto);

    let nuevoProducto = {
      id: nuevaID,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      image: req.file.filename,
      category: req.body.category,
    };

    products.push(nuevoProducto);

    fs.writeFileSync(
      path.join(__dirname, '../data/productsDataBase.json'),
      JSON.stringify(products, null, 2)
    );
    res.redirect('/products');
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    const id = req.params.id;
    const product = products.find((item) => item.id == id);
    res.render('product-edit-form', { productToEdit: product });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    res.send('Producto modificado');
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    res.send('Producto Borradox');
  },
};

module.exports = controller;
