'use strict';
import { combineReducers } from 'redux'
import {
	ADD_CONTACT,
	TOGGLE_CONTACT,
	SET_VISIBILITY_FILTER,
	CONTACTS_LOADING,
	CONTACTS_ERRORED,
	VisibilityFilters
} from '../actions/Actions.js'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return SHOW_ALL
	}
}

function contacts(state = [], action) {
	switch (action.type) {
		case ADD_CONTACT:
			return [
				...state,
				{
					id: action.id,
					name: action.name,
					number: action.number,
					selected: action.selected
				}
			]
		case TOGGLE_CONTACT:
			var res =  state.map((contact, index) => {
				if (contact.id === action.id) {
					return Object.assign({}, contact, {
						selected: !contact.selected
					})
				}
				return contact
			})
			return res
		default:
			return state
	}
}

export function loadingItems(state = false, action) {
    switch (action.type) {
        case CONTACTS_ERRORED:
            return action.hasErrored;
        case CONTACTS_LOADING:
        	return action.isLoading;
        default:
            return state;
    }
}

const contactsApp = combineReducers({
	visibilityFilter,
	contacts,
	loadingItems,
})

export default contactsApp
