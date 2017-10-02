import React from 'react'
import {
	Button,
	TextInput,
	View
} from 'react-native'
import { connect } from 'react-redux'
import { addContact } from '../actions/Actions.js'
import AddContact from '../components/AddContact.js'

const mapDispatchToProps = dispatch => {
	return {
		addContact: (name, number) => {
			dispatch(addContact(name, number))
		}
	}
}

const AddNewContact = connect(
	null,
	mapDispatchToProps
)(AddContact)

export default AddNewContact