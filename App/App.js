'use strict';
import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View
} from 'react-native';
import { 
	Provider,
	connect } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers/Reducers.js'
import AddNewContact from './containers/AddNewContact.js'
import VisibleContactsList from './containers/VisibleContactsList.js'
import FiltersLink from './containers/FiltersLink.js'
import StatusBarBackground from './components/StatusBar.js'

let store = createStore(reducers)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<View style={styles.container}>
					<StatusBarBackground/>
					<AddNewContact/>
					<VisibleContactsList/>
					<FiltersLink/>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'stretch'
	},
});