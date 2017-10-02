import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

class SelectedToggle extends Component {
  toggle = () => {
    if (this.props.selected) {
      this.props.onUnchecked(this.props.index);
    } else {
      this.props.onChecked(this.props.index);
    }
  }
  getStyle() {
    if (this.props.selected) {
      return styles.selected;
    } else {
      return styles.unselected;
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, this.getStyle()]}
        onPress={this.toggle}>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  selected: {
    backgroundColor: '#81c04d'
  },
  unselected: {
    backgroundColor: 'gray'
  }
});

export default SelectedToggle;