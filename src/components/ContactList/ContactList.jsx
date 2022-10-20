import PropTypes from 'prop-types';
import { Li, Ul } from './ContactList.styled';

export const ContactList = ({ contacts, onDeleteContact }) => (
    <Ul>
      {contacts.map((contact) => (
        <Li key={contact.id}>
          {contact.name + ":" + contact.number}
          {
            <button
              
              type="button"
              name="delte"
              onClick={() => onDeleteContact(contact.id)}
            >
              delete
            </button>
          }
        </Li>
      ))}
    </Ul>
  );
  
  ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
  }
