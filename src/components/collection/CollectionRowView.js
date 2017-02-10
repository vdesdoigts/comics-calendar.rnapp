import React, { Component, PropTypes } from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
} from 'react-native';
import { Actions } from "react-native-router-flux";
import rowStyle from '../../styles/row';
import comicsRowStyle from '../../styles/comicsRow';

export default class CollectionRowView extends Component {

  constructor(props) {
    super(props);

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = {
      isChecked: this.props.isChecked,
    };
  }

  toggleCheckbox() {
    const { item, onCheckRow, onUncheckRow } = this.props;
    const { isChecked } = this.state;

    if (isChecked) {
      onUncheckRow(item);
      this.setState({ isChecked: false });
    } else {
      onCheckRow(item);
      this.setState({ isChecked: true });
    }
  }

  render() {
    const { item } = this.props;
    const { isChecked } = this.state;
    let checkedStatus = isChecked ? rowStyle.checkboxOn : rowStyle.checkboxOff;

    return (
      <TouchableWithoutFeedback onPress={() => this.toggleCheckbox()}>
        <View style={rowStyle.row}>
          <View style={comicsRowStyle.rowContent}>
            <Text style={rowStyle.title} numberOfLines={1}>{item.name}</Text>
            {item.name !== item.distributorCollection
              && <Text style={rowStyle.subtitle} numberOfLines={1}>{item.distributorCollection.toUpperCase()}</Text>
              || <Text style={rowStyle.subtitle} numberOfLines={1}>ONE SHOT</Text>
            }
          </View>
          <View style={rowStyle.checkboxContainer}>
            <View style={[rowStyle.checkbox, checkedStatus]} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

CollectionRowView.propTypes = {
  item: PropTypes.object,
  isChecked: PropTypes.bool,
  onCheckRow: PropTypes.func,
  onUncheckRow: PropTypes.func,
}
