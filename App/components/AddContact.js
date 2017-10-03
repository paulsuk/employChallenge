import React, { Component } from 'react'
import {
	Button,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import Contacts from 'react-native-contacts';

class AddContact extends Component {
	constructor(props) {
		super(props)
		this.state = {name: null, number: null, field: null}
	}

	onText(text) {
		switch (this.state.field) {
			case 'name':
				this.setState({name: text, number: this.state.number, field: this.state.field})
				break;
			case 'number':
				this.setState({name: this.state.name, number: text, field: this.state.field})
				break;
		}
	}

	onButtonPress() {
		if (this.state.number && this.state.name) {
			var newPerson = {
				givenName: this.state.name,
				phoneNumbers: [
					{label: 'mobile', number: this.state.number}
				]
			}

			Contacts.addContact(newPerson, (err) => {
				if (err === 'denied') {
					console.log(err)
				}
			})
			this.props.addContact(this.state.name, this.state.number)
			this.setState({name: null, number: null, field: null})
		}
	}

	render() {
		return (
			<View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
				<TextInput
				ref="name"
				style={{height: 40}}
				placeholder="Contact Name"
				onChangeText = {(text) => this.onText(text)}
				onFocus = {() => {
					this.state.field = 'name'
					this.setState(this.state)
				}}
				value = {this.state.name}
				/>
				<TextInput
				ref="number"
				keyboardType='numeric'
				style={{height: 40}}
				placeholder='Contact Number'
				onChangeText = {(text) => this.onText(text)}
				onFocus = {() => {
					this.state.field = 'number'
					this.setState(this.state)
				}}
				value = {this.state.number}
				/>
				<Button
				style={{height: 40}}
				onPress={() => this.onButtonPress()}
				title="Add Contact"
				/>
			</View>	
		)
	}
}

export default AddContact