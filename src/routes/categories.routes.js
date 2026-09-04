const express = require('express');
const router = express.Router();
// TODO: implementar en el paso "Catálogo" (patrón igual a products)
router.get('/', (req, res) => res.json([]));
module.exports = router;
