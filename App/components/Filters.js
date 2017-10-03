'use strict';
import React, {	Component } from 'react';
import {
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native';
import {
	VisibilityFilters
} from '../actions/Actions.js'

class Filters extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeFilter: props.activeFilter
		} 
	}

	render() {
		return (
			<View style={styles.bar}>
				{this.renderFilters()}
			</View>
		);
	}

	renderFilters() {
		var activeFilter = this.state.activeFilter;
		return Object.keys(VisibilityFilters).map(filter => {
			var style = [styles.text];
			if (activeFilter === filter) {
				style.push(styles.current);
			} else {
				style.push(styles.notSelected);
			}
			return (
				<TouchableOpacity
					key = {filter}
					style = {styles.button}>
					<Text 
						style={style}
						onPress = {() => {this.onPress(filter)}}>
							{filter}
					</Text>
				</TouchableOpacity>
			)
		})
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.activeFilter) {
			if (nextProps.activeFilter !== this.props.activeFilter) {
				this.setState({activeFilter: nextProps.activeFilter})
			}
		}
	}

	onPress(filter) {
		this.props.onPress(filter)
	}
}

const styles = StyleSheet.create({
	bar: {
		flexDirection: 'row',
		height: 50
	},
	button: {
		flex: 1,
		backgroundColor: 'red'
	},
	text: {
		flex: 1,
		color: '#fff',
		textAlign: 'center',
		alignContent: 'center'
	},
 	current: {
		backgroundColor: '#70a743'
	},
	notSelected: {
		backgroundColor: '#81c04d'
	}
})


export default Filters;