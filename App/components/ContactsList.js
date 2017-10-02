import React, { Component } from 'react' 
import {
	TouchableHighlight,
	StyleSheet,
	View,
	Text,
	ListView 
} from 'react-native';
import SelectedToggle from './SelectedToggle.js'

class ContactsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}),
		}; 
		if (this.props.contacts) {
			this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.contacts)
		}
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.contacts) {
			if (nextProps.contacts !== this.props.contacts) {
				this.state.dataSource = this.state.dataSource.cloneWithRows(nextProps.contacts)
			}
		}
	}

	renderRow = (contact) => {
		return this.renderContactItem(contact)
	}

	renderContactItem(contact) {
		return (
			<TouchableHighlight
				underlayColor = '#0c00f9'
				key = {contact.id}
				onPress = {() => {
					this.onContactClick(contact.index);
				}}>
				<View style={styles.row}>
					<SelectedToggle
						selected={contact.selected}
						onChecked={() => this.onContactClick(contact.id)}
						onUnchecked={() => this.onContactClick(contact.id)} />
			        <Text style={[styles.text, styles.name]}>
			        	{contact.name}
			        </Text>
			        <Text style={[styles.text, styles.number]}>
			        	{contact.number}
			        </Text>
				</View>
			</TouchableHighlight>	
		)
	}

	render() {
		return (
			<ListView
				dataSource = {this.state.dataSource}
				renderRow = {this.renderRow} 
				style={styles.listContainer}
			/>
			);
	}

	onContactClick(index) {
		console.log('yo')
		this.props.onContactClick(index)
	}
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#d3d3d3'
	},
	row: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		height: 60,
		alignItems: 'center'
	},
	text: {
		flexDirection: 'row',
		flex: 1,
		fontSize: 20,
		marginLeft: 10,
	},
	name: {
		textAlign: 'left'
	},
	number: {
		textAlign: 'right'
	}
});

export default ContactsList;