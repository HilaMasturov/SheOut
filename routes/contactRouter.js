const express = require('express');
const contactController = require('../controllers/contactController.js');

const router = express.Router();

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);
router.put('/:id', contactController.editContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
