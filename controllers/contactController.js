const Contact = require('../models/contactModel');
const { Types } = require('mongoose');
const { ObjectId } = Types;

const createContact = async (req, res) => {
    try {
        const contactData = req.body;
        const newContact = await Contact.create(contactData);
        res.json(newContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactData = req.body;
        await Contact.updateOne({ _id: new ObjectId(id) }, { $set: contactData });
        const updatedContact = await Contact.findOne({ _id: new ObjectId(id) });
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.deleteOne({ _id: new ObjectId(id) });
        res.json({deleted:true});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createContact,
    getAllContacts,
    editContact,
    deleteContact
};
