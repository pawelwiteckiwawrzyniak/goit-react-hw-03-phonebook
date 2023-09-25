import PropTypes from 'prop-types';
import css from './ContactFilter.module.css';

export const ContactFilter = ({ handleFilter }) => (
  <div className={css.filter}>
    <span className={css.filter__title}>Find contacts by name</span>
    <input
      className={css.filter__inputBox}
      type="text"
      name="filter"
      onChange={handleFilter}
    />
  </div>
);

ContactFilter.propTypes = {
  handleFilter: PropTypes.func,
};
