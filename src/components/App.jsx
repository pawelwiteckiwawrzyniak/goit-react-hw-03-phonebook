import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [
      { name: 'Rosie Simpson', number: '459-12-56', id: 'id-1' },
      { name: 'Hermione Kline', number: '443-89-12', id: 'id-2' },
      { name: 'Eden Clements', number: '645-17-79', id: 'id-3' },
      { name: 'Annie Copeland', number: '227-91-26', id: 'id-4' },
    ],
    filter: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    let name = form.elements.name.value;
    let number = form.elements.number.value;
    const id = nanoid();

    const listOfContacts = this.state.contacts.map(contacts => contacts.name);

    if (listOfContacts.find(contact => contact === name)) {
      return alert(name + ' is already in your contacts!');
    }
    this.setState({
      contacts: [...this.state.contacts, { name, number, id }],
    });
    form.elements.name.value = '';
    form.elements.number.value = '';

    let allContacts = this.state.contacts;
    /* if (localStorage.getItem('contacts') !== null) {
      const LS = localStorage.getItem('contacts');
      const LSParse = JSON.parse(LS);

      console.log(LSParse);
      this.setState(prevState => {
        return { contacts: LSParse };
      });
    } */
    localStorage.setItem('contacts', JSON.stringify(allContacts));
  };

  handleFilter = event => {
    const filteredName = event.currentTarget.value;
    this.setState({ filter: filteredName.toLowerCase() });
  };

  handleDelete = event => {
    const id = event.currentTarget.id;
    const index = this.state.contacts.findIndex(contact => contact.id === id);
    const contacts = this.state.contacts;
    contacts.splice(index, 1);
    this.setState({ contacts: contacts });
    let allContacts = this.state.contacts;
    localStorage.setItem('contacts', JSON.stringify(allContacts));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit}></ContactForm>
        <h2>Contacts</h2>
        <ContactFilter handleFilter={this.handleFilter}></ContactFilter>
        <ContactList
          contacts={this.state.contacts}
          filterPhrase={this.state.filter}
          handleDelete={this.handleDelete}
        ></ContactList>
      </div>
    );
  }
}
