import React, { Component } from 'react' 
import {
	ActivityIndicator,
	TouchableHighlight,
	StyleSheet,
	View,
	Text,
	SectionList 
} from 'react-native';
import Contacts from 'react-native-contacts';
import SelectedToggle from './SelectedToggle.js';
import _ from 'lodash'

class ContactsList extends Component {
	constructor(props) {
		super(props)
		this.state = {
 			dataSource: [],
			hasErrored: false,
			isLoading: false
		}
	}

	async componentDidMount() {
		this.loadAllContacts()
		if (this.props.contacts) {
			var data = await this.groupAndReduceData(this.props.contacts)
		} else {
			var data = []
			this.setState({
				dataSource: data,
				hasErrored: this.state.hasErrored,
				isLoading: this.state.isLoading
			})
		}
	}

	async loadAllContacts() {
		this.setState({dataSource: this.state.dataSource, isLoading: true, hasErrored: false}, Contacts.getAll((err, contacts) => {
				if (!err) {
					for(var i = 0; i < contacts.length; i++) {
						let name = contacts[i].givenName + ' ' + contacts[i].familyName;
						let number = contacts[i].phoneNumbers[0].number;
						this.props.addContact(name, number)
					}
					this.setState({dataSource: this.state.dataSource, isLoading: false, hasErrored: false})
				} else {
					this.setState({dataSource: this.state.dataSource, isLoading: false, hasErrored: true})
				}
			})
		)
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.contacts) {
			if (nextProps.contacts !== this.props.contacts) {
				this.setState({dataSource: this.groupAndReduceData(nextProps.contacts), isLoading: this.props.isLoading, hasErrored: this.props.hasErrored})
			}
		}
	}

	groupAndReduceData(data) {
		let dataSource = _.groupBy(data, d => d.name.charAt(0))
		for (var key in dataSource) {
			dataSource[key].sort( function(a,b){ var x = a.name, y = b.name; return x === y ? 0 : x < y ? -1 : 1; } );
		}
		dataSource = _.reduce(dataSource, (acc, next, index) => {
			acc.push({
				key: index,
				data: next
			})
			return acc
		}, [])
		dataSource.sort(function(a, b) {
			var x = a.key, y = b.key; 
			return x === y ? 0 : x < y ? -1 : 1;
		})
		return dataSource
	}

	renderItem = (item) => {
		style = [styles.row]
		if (item.item.selected) {
			style.push(styles.selected)
		}
		return (<TouchableHighlight
				key = {item.item.id}>
				<View style={style}>
					<SelectedToggle
						selected={item.item.selected}
						onChecked={() => this.onContactClick(item.item.id)}
						onUnchecked={() => this.onContactClick(item.item.id)} />
			        <Text style={[styles.text, styles.name]}>
			        	{item.item.name}
			        </Text>
			        <Text style={[styles.text, styles.number]}>
			        	{item.item.number}
			        </Text>
				</View>
			</TouchableHighlight>	
		)
	}

	renderHeader = (headerItem) => {
		return <Text>{headerItem.section.key}</Text>
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.listContainer}>
					<ActivityIndicator
						animating={this.state.isLoading}
				        style={[styles.centering, {height: 80}]}
				        size="large"/>
				</View>
				);
		} else {
			return (
				<View style={styles.listContainer}>
					<SectionList
						renderItem = {this.renderItem}
						renderSectionHeader = {this.renderHeader}
						sections = {this.state.dataSource}
						keyExtractor={(item) => item.name}
						style={styles.listContainer}
					/>
				</View>
				);
		}
	}

	onContactClick(index) {
		this.props.onContactClick(index)
	}
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#d3d3d3'
	},
	selected: {
		backgroundColor: '#f1f1f1'
	},
	row: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		height: 60,
		alignItems: 'center',
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
	},
	centering: {
		flex: 1,
		alignSelf: 'stretch',
	    alignItems: 'center',
	    justifyContent: 'center',
	    padding: 8,
  },
});

export default ContactsList;