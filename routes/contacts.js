const express = require("express");
const router = express.Router();

// @route       POST    /api/contacts
// @desc        Create contact
// @access      Public
router.post("/",(req,res)=>{
    res.send("Add contact");
});

// @route       GET    /api/contacts
// @desc        Get user contacts
// @access      Public
router.get("/",(req,res)=>{
    res.send("Get contacts");
});

// @route       PUT    /api/contacts/:id
// @desc        Update contact
// @access      Public
router.put("/:id",(req,res)=>{
    res.send("Update contact");
});

// @route       DELETE    /api/contacts/:id
// @desc        Create contact
// @access      Public
router.delete("/:id",(req,res)=>{
    res.send("Delete contact");
});

module.exports = router;