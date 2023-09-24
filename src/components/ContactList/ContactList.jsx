import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import { Fragment } from 'react';

export const ContactList = ({ contacts, filterPhrase, handleDelete }) => {
  const handleFilteredList = () => {
    let filteredNames = [];
    contacts.forEach(contact => {
      if (contact.name.toLowerCase().includes(filterPhrase)) {
        filteredNames.push(contact);
      }
    });
    return filteredNames;
  };

  return (
    <ul className={css.contactList}>
      {filterPhrase === '' ? (
        <Fragment>
          {contacts.map(item => (
            <li key={item.id} className={css.contactList__item}>
              {item.name}: {item.number}
              <button
                type="button"
                onClick={handleDelete}
                id={item.id}
                className={css.button}
              >
                Delete
              </button>
            </li>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {handleFilteredList().map(item => (
            <li key={item.id} className={css.contactList__item}>
              {item.name}: {item.number}
              <button
                type="button"
                onClick={handleDelete}
                id={item.id}
                className={css.button}
              >
                Delete
              </button>
            </li>
          ))}
        </Fragment>
      )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filterPhrase: PropTypes.string,
  handleDelete: PropTypes.func,
};
