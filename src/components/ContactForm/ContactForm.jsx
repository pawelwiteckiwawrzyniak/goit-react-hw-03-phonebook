import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className={css.form}>
    <span className={css.form__detailsTitle}>Name</span>
    <input
      className={css.form__inputBox}
      type="text"
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />

    <span className={css.form__detailsTitle}>Number</span>
    <input
      className={css.form__inputBox}
      type="tel"
      name="number"
      pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
    />

    <button type="submit" className={css.form__submitButton}>
      Add contact
    </button>
  </form>
);

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
