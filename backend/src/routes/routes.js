const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const FileController = require('../app/controllers/FileController');

const routes = Router();

routes.get('/posts',FileController.index);
routes.post('/posts', multer(multerConfig).single('file') ,FileController.store);
routes.delete('/posts/:id',FileController.delete);

module.exports = routes;