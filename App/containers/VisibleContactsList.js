import { connect } from 'react-redux'
import { 
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
		contacts: getVisibleContacts(state.contacts, state.visibilityFilter)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onContactClick: index => {
			dispatch(toggleContact(index))
		}
	}
}

const VisibleContactsList = connect(
	mapStateToProps,
	mapDispatchToProps
	)(ContactsList)

export default VisibleContactsList