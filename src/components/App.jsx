import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts') === null) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } else {
      const ls = localStorage.getItem('contacts');
      const lsParse = JSON.parse(ls);
      this.setState({ contacts: lsParse });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
    const newState = [...this.state.contacts, { name, number, id }];
    this.setState({
      contacts: newState,
    });
    form.reset();
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
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <ContactFilter handleFilter={this.handleFilter} />
        <ContactList
          contacts={this.state.contacts}
          filterPhrase={this.state.filter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
