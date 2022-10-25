import React from 'react';
import {ContactForm} from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import {ContactList} from './ContactList/ContactList'
import { Filter } from './Filter/Filter';

export class App extends React.Component {

 state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: "",
}
 
  formSubmitHandler = data => {
    console.log(data);
    data.id = nanoid();
    const contacts = this.state.contacts;
    const findName = contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase());
    if (findName) {
      return alert(`${data.name} is already in contacts.`);
    }

    this.setState(prevState => ({
      contacts : [...prevState.contacts, data],
    }));
  };

  deleteContact = dataId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== dataId),
    }));
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter)
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  }

  componentDidMount () {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    
    if(parseContacts) {
      this.setState({contacts: parseContacts});
    }
  };

  componentDidUpdate(prevProps, prevState)  {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts, записываю в localStorage');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));

    }
  };
  

  render() {
   
    const { filter } = this.state;
    const visibleContacts = this.getContacts();
    
  return (
    
    <>
    <section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit = {this.formSubmitHandler}/>
    </section>
    <section>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter}/>
      <ContactList 
      contacts={visibleContacts}
      onDeleteContact={this.deleteContact}/>
     
    </section>
    
   </>

  )

};
};







