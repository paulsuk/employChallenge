'use strict';
import React, {	Component } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native';
import {
	setVisibilityFilter,
	VisibilityFilters
} from '../actions/Actions.js'

class Filters extends Component {
	render() {
		return (
			<View style={styles.bar}>
				{this.renderFilters()}
			</View>
		);
	}

	renderFilters() {
		var activeFilter = this.props.activeFilter;
		return Object.keys(VisibilityFilters).map(filter => {
			var style = [styles.button];
			if (activeFilter === filter) {
				style.push(styles.current);
			}
			return (
				<TouchableOpacity
					key = {filter}
					style = {style}
					onPress = {setVisibilityFilter()}>
					<Text style={styles.text}>{filter}</Text>
				</TouchableOpacity>
			)
		})
	}
}

const styles = StyleSheet.create({
	bar: {
		backgroundColor: '#81c04d',
		flexDirection: 'row',
		height: 50
	},
	button: {
		flex: 1,
		alignItems: 'center'
	},
	text: {
		flex: 1,
		color: '#fff',
		textAlign: 'center',
		fontWeight: 'bold'
	},
 	current: {
		backgroundColor: '#70a743'
	}
})


export default Filters;