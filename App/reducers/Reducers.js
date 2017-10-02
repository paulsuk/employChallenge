'use strict';
import { combineReducers } from 'redux'
import {
	ADD_CONTACT,
	TOGGLE_CONTACT,
	SET_VISIBILITY_FILTER,
	VisibilityFilters
} from '../actions/Actions.js'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter
		default:
			return state
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
			return state.map((contact, index) => {
				if (index == action.index) {
					return Object.assign({}, contact, {
						selected: !contact.selected
					})
				}
				return contact
			})
		default:
			return state
	}
}


const contactsApp = combineReducers({
	visibilityFilter,
	contacts
})

export default contactsApp
