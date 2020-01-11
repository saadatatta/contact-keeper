import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "../contacts/ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Contact = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (contacts.length == 0) {
    return <h4>No contacts found</h4>;
  }

  if (filtered) {
    return (
      <Fragment>
        <TransitionGroup>
          {filtered.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact}></ContactItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <TransitionGroup>
          {contacts.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact}></ContactItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  }
};

export default Contact;
