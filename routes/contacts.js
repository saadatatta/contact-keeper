const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require('../middleware/user');
const Contact = require("../models/Contact");

// @route       POST    /api/contacts
// @desc        Create contact
// @access      Private
router.post("/",[auth,[
    check('name').notEmpty()
]],async (req,res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const {name,email,phone,type} = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
   
});

// @route       GET    /api/contacts
// @desc        Get user contacts
// @access      Private
router.get("/",auth,async(req,res)=>{
    try {
        let contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// @route       PUT    /api/contacts/:id
// @desc        Update contact
// @access      Private
router.put("/:id",auth,(req,res)=>{
    try {
        const contact = Contact.findById(req.params.id);
        if (!contact)
            return res.status(404).send({msg: "Contact not found."})
        contact.update();
        res.json({contact});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// @route       DELETE    /api/contacts/:id
// @desc        Create contact
// @access      Public
router.delete("/:id",(req,res)=>{
    
});

module.exports = router;