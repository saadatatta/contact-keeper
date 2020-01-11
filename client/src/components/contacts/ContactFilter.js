import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const text = useRef("");
  const contactContext = useContext(ContactContext);
  const { filtered, filterContacts, clearFilter } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value) {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Search"
        onChange={onChange}
      ></input>
    </form>
  );
};

export default ContactFilter;
