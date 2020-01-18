import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

import AlertContext from "../../context/alert/alertContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const {
    current,
    addContact,
    updateContact,
    clearCurrent,
    error
  } = contactContext;
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (error) {
      alertContext.setAlert(error, "danger");
    }
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
    //eslint-disable-next-line
  }, [current, error, contactContext]);

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrent();
  };

  const onClear = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      ></input>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      ></input>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      ></input>
      <h4>Contact Type</h4>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      ></input>
      Personal
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      ></input>
      Professional
      <button type="submit" className="btn btn-primary btn-block">
        {current ? "UPDATE" : "ADD"}
      </button>
      <button className="btn btn-light btn-block" onClick={onClear}>
        CLEAR
      </button>
    </form>
  );
};

export default ContactForm;
