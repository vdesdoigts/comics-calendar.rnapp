import React, { Component, PropTypes } from 'react';
import {
  Image,
  LayoutAnimation,
  Linking,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { CONFIG } from '../../config';
import moment from 'moment';
import frLocale from 'moment/locale/fr';
import enLocale from 'moment/locale/en-gb';
import I18n from '../../../i18n/i18n';
import BackButton from '../common/BackButton';
import layoutStyle from '../../styles/layout';
import navbarStyle from '../../styles/navbarStyle';
import comicsStyle from '../../styles/comics';
import buttonStyle from '../../styles/button';

const assets = CONFIG.ASSETS_URL;
const MOMENT_LOCALE = I18n.locale === 'fr-FR' ? 'fr' : 'en-gb';
const MOMENT_FORMAT = I18n.locale === 'fr-FR' ? 'DD/MM/YY' : 'M s YY';

export default class BookDetail extends Component {

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = {
      isChecked: this.props.isChecked,
      displayNavbar: 0,
      h: 0,
    };
  }

  handleScroll(event) {
    LayoutAnimation.spring();

    if (event.nativeEvent.contentOffset.y >= 104 && this.state.h === 0) {
      this.setState({ h: 44 });
    } else if (event.nativeEvent.contentOffset.y < 104 && this.state.h === 44) {
      this.setState({ h: 0 });
    }
  }

  toggleCheckbox() {
    const { isChecked } = this.state;

    if (isChecked) {
      this.setState({ isChecked: false });
    } else {
      this.setState({ isChecked: true });
    }
  }

  render() {
    const { navigator, item, onCheckButtonPress } = this.props;
    const { isChecked, displayNavbar, h } = this.state;
    const navbarStyleStatus = displayNavbar ? navbarStyle.comicsNavbarDisplayed : navbarStyle.comicsNavbarHidden;
    const checkButtonStatus = isChecked ? I18n.t('i_have_it') : I18n.t('i_dont_have_it');

    return (
      <View style={layoutStyle.mastContainer}>
        <Image source={{ uri: `${assets}/${item.imageUrl}` }} style={[comicsStyle.cover]} height={240} />
        <View style={comicsStyle.headShadow} />
        <View style={comicsStyle.headShadowMask} />

        <ScrollView automaticallyAdjustContentInsets={false} bounces={true} onScroll={this.handleScroll} scrollEventThrottle={16}>
          <View style={comicsStyle.mastcontainer}>
            <View style={comicsStyle.mastcontent}>
              <View style={comicsStyle.head}>
                {item.issue
                  && <Text style={comicsStyle.title}>{item.name} #{item.issue}</Text>
                  || <Text style={comicsStyle.title}>{item.name}</Text>
                }
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 4 }}>
                  <Text style={comicsStyle.released}>{moment(item.releasedAt.date).locale(MOMENT_LOCALE).format(MOMENT_FORMAT)} - </Text>
                  <Text style={[comicsStyle.released, { color: '#848484' }]}>{item.distributorCollection}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
                  <TouchableHighlight underlayColor='#ed216b' activeOpacity={1} style={buttonStyle.button} onPress={() => {onCheckButtonPress(); this.toggleCheckbox(); }}>
                    <Text style={buttonStyle.buttonText}>{checkButtonStatus}</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={comicsStyle.body}>
                <Text style={comicsStyle.bodyText}>{item.description}</Text>
                <TouchableHighlight style={{ backgroundColor: '#fff' }} underlayColor='#fff' onPress={() => ( Linking.openURL(item.distributorUrl).catch(err => Alert.alert(I18n.t('error_happened'), I18n.t('error_later'))))}>
                  <Text style={[comicsStyle.bodyText, { marginTop: 10, color: '#FF2473' }]}>{I18n.t('available')} {item.distributor}</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={[navbarStyle.comicsNavbar, { height: h }]} />
        <BackButton navigator={navigator} />
      </View>
    );
  }
}

BookDetail.propTypes = {
  navigator: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheckButtonPress: PropTypes.func.isRequired,
  onCheckRow: PropTypes.func,
  onUncheckRow: PropTypes.func,
}

BookDetail.defaultProps = {
  onCheckRow: () => {},
  onUncheckRow: () => {},
}

// Blur
// import { BlurView } from 'react-native-blur';
// <View style={{ flex: 1 }}>
//   <View style={{ flex: 1, flexDirection: 'row' }}>
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', position: 'relative' }}>
//       <Image source={{ uri: comics.posters.thumbnail }} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
//         <BlurView blurType="light" style={{ flex: 1, alignItems: 'stretch' }} />
//       </Image>
//       <View style={[layoutStyle.mastcontainer, { flex: 1 }]}>
//         <Text>Coucou</Text>
//       </View>
//     </View>
//   </View>
// </View>
