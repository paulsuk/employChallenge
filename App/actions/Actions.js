'use strict';
import _ from 'lodash';

/*
 * Action Types
 */
export const ADD_CONTACT = 'ADD_CONTACT'
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