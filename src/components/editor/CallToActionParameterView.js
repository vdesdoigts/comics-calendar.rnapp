import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import I18n from '../../../i18n/i18n';
import { Actions } from 'react-native-router-flux';
import callToActionParameterStyle from '../../styles/callToActionParameter';

export default class CallToActionParameterView extends Component {

  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.timeout = null;
    this.preventDoubleTap = false;
  }

  onPress() {
    const { navigator } = this.props;

    if (!this.preventDoubleTap) navigator.push({ screen: 'comicscalendar.ParameterScreen', title: 'Parameter', navigatorStyle: { navBarHidden: true, statusBarHidden: true }});
    this.preventDoubleTap = true;

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.preventDoubleTap = false;
    }, 800);
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={callToActionParameterStyle.container}>
          <Image source={require('../../../assets/images/landingpage-black.jpg')} style={callToActionParameterStyle.background} />
          <View style={callToActionParameterStyle.content}>
            <Image source={require('../../../assets/images/parameters-white.png')} style={callToActionParameterStyle.icon} />
            <Text style={callToActionParameterStyle.text}>{I18n.t('call_to_action_parameter')}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
