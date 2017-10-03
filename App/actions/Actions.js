'use strict';
import _ from 'lodash';

/*
 * Action Types
 */
export const ADD_CONTACT = 'ADD_CONTACT'
export const CONTACTS_LOADING = 'CONTACTS_LOADING'
export const CONTACTS_ERRORED = 'CONTACTS_ERRORED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const TOGGLE_CONTACT = 'TOGGLE_CONTACT'

/*
 * Other Constants
 */

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_SELECTED: 'SHOW_SELECTED'
}

export function addContact(name, number) {
	return {
		type: ADD_CONTACT,
		name: name,
		number: number,
		id: _.uniqueId(),
		selected: false
	}
}

export function toggleContact(id) {
	return {
		type: TOGGLE_CONTACT,
		id
	}
}

export function setVisibilityFilter(filter) {
	return {
		type: SET_VISIBILITY_FILTER,
		filter
	}
}

export function contactsErrored(bool) {
	return {
		type: CONTACTS_ERRORED,
		hasErrored: bool
	}
}

export function contactsLoading(bool) {
	return {
		type: CONTACTS_LOADING,
		isLoading: bool
	}
}