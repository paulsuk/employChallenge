import React, { Component } from 'react'
import {
	Button,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

class AddContact extends Component {
	constructor(props) {
		super(props)
		this.state = {name: null, number: null}
	}

	onText(text, field) {
		switch (field) {
			case 'name':
				this.state.name = text
				this.setState(this.state)
			case 'number':
				this.state.number = text
				this.setState(this.state)
		}
	}

	onButtonPress() {
		this.props.addContact(this.state.name, this.state.number)
	}

	render() {
		return (
			<View style={{height: 50, flexDirection: 'row', alignItems: 'center'}}>
				<TextInput
				ref="name"
				style={{height: 40}}
				placeholder="Contact Name"
				onChangeText = {(text) => this.onText(text, 'name')}
				/>
				<TextInput
				ref="number"
				keyboardType='numeric'
				style={{height: 40}}
				placeholder="Contact Number"
				onChangeText = {(text) => this.onText(text, 'number')}
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