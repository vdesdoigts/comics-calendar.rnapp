import React, { Component, PropTypes } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MOCKED_EDITOR_DATA } from '../../constant';
import editorRowViewStyle from '../../styles/editorRowView';

export default class EditorRowView extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.timeout = null;
    this.preventDoubleTap = false;
  }

  getRowHeight() {
    const { totalRow } = this.props;
  }

  onPress(item, editor) {
    const { onPress } = this.props;

    if (!this.preventDoubleTap) onPress(item.id, editor[0]);
    this.preventDoubleTap = true;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.preventDoubleTap = false;
    }, 800);
  }

  render() {
    const { item, rowHeight } = this.props;

    const editor = MOCKED_EDITOR_DATA.filter((obj) => {
      return obj.canonicalName === item.canonicalName;
    });

    return (
      <TouchableWithoutFeedback onPress={() => this.onPress(item, editor)}>
        <View style={[editorRowViewStyle.container, { height: rowHeight }]}>
          <View style={editorRowViewStyle.backgroundContainer}>
            <Image source={editor[0].cover} style={editorRowViewStyle.background} />
          </View>
          <Image source={editor[0].logo} style={editorRowViewStyle.logo} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

EditorRowView.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  rowHeight: PropTypes.number,
}

EditorRowView.defaultProps = {
  onPress: () => {},
}
