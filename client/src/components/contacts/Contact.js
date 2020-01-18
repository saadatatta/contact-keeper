import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "../contacts/ContactItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from "../layouts/Spinner";

const Contact = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, loading, getContacts } = contactContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts && contacts.length == 0 && !loading) {
    return <h4>No contacts found</h4>;
  }

  if (loading) return <Spinner></Spinner>;

  if (filtered) {
    return (
      <Fragment>
        <TransitionGroup>
          {filtered.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames="item">
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
            <CSSTransition key={contact._id} timeout={500} classNames="item">
              <ContactItem contact={contact}></ContactItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Fragment>
    );
  }
};

export default Contact;
