import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'components/ContactForm/ContactForm.styled';

export class ContactForm extends React.Component {
    state = { 
        name: '',
        number: ''
    };

    handleNameChange = event => {
        const {name, value} = event.target;
        console.log ('name was changed', event.target.value);
        this.setState({ [name]: value});
       
    };
    
    handleSubmit =  event => {
        event.preventDefault();
        console.log ('form  is submitted', this.state.name);
        this.props.onSubmit(this.state);
        this.reset();
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    reset = () => {
      this.setState({ name: '',  number: ''});
    };

    render () {

        return (
        <Form onSubmit = {this.handleSubmit}>
            <Label htmlFor={this.nameId}>
                Name
                <input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                value={this.state.name}
                onChange={this.handleNameChange}
                required/>
            </Label>
            <Label htmlFor={this.numberId}>
                Number
            <input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                value={this.state.number}
                onChange={this.handleNameChange}
                required/>
            </Label>
                
            <button type='submit'>Add contact</button>
         </Form>
        );

    }
}

export default  ContactForm;