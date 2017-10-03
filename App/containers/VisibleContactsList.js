import { connect } from 'react-redux'
import { 
	addContact,
	contactErrored,
	contactsLoading,
	contactsErrored,
	contactsFetched,
	toggleContact,
	VisibilityFilters } from '../actions/Actions.js'
import ContactsList from '../components/ContactsList.js'

const getVisibleContacts = (contacts, filter) => {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return contacts
		case VisibilityFilters.SHOW_SELECTED:
			return contacts.filter(t => t.selected)
	}
}

const mapStateToProps = state => {
	return {
		contacts: getVisibleContacts(state.contacts, state.visibilityFilter),
		hasErrored: state.hasErrored,
		isLoading: state.isLoading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onContactClick: index => {
			dispatch(toggleContact(index))
		},
		addContact: (name, number) => {
			dispatch(addContact(name, number))
		},
		didFail: (bool) => {
			dispatch(contactsErrored(bool))
		},
		loading: (bool) => {
			dispatch(contactsLoading(bool))
		}
	}
}

const VisibleContactsList = connect(
	mapStateToProps,
	mapDispatchToProps
	)(ContactsList)

export default VisibleContactsList