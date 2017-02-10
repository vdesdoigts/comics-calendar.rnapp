import React, { Component, PropTypes } from 'react';
import {
  Image,
  LayoutAnimation,
  ListView,
  Platform,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import localBookActions from '../actions/localBook';
import { CONFIG } from '../config';
import moment from 'moment';
import frLocale from 'moment/locale/fr';
import enLocale from 'moment/locale/en-gb';
import I18n from '../../i18n/i18n';
import Channel from '../channel';
import BackButton from './common/BackButton';
import LoadingView from './common/LoadingView';
import SuperListView from './common/SuperListView';
import BookHeaderView from './book/BookHeaderView';
import SectionHeaderView from './common/SectionHeaderView';
import BookRowView from './book/BookRowView';
import layoutStyle from '../styles/layout';
import navbarStyle from '../styles/navbarStyle';

const assets = CONFIG.ASSETS_URL;
const MOMENT_LOCALE = I18n.locale === 'fr-FR' ? 'fr' : 'en-gb';

export default class BooksContainer extends Component {

  constructor(props) {
    super(props);

    this.channel = new Channel();
    this.onFetch = this.onFetch.bind(this);
    this.convertBookArrayToMap = this.convertBookArrayToMap.bind(this);
    this.renderHeaderView = this.renderHeaderView.bind(this);
    this.renderSectionHeaderView = this.renderSectionHeaderView.bind(this);
    this.renderListRowView = this.renderListRowView.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.mount = false;
    this.firstLoad = true;
    this.limit = 40;
    this.offset = 0;
    this.state = {
      isLoaded: false,
      selectedRows: this.props.localBook.localBookKeys.data,
      rows: {},
      displayNavbar: 0,
      h: 0,
    };
  }

  componentDidMount() {
    this.mount = true;
    const { dispatch } = this.props;
    dispatch(localBookActions.getLocalBooks());
  }

  componentWillReceiveProps(nextProps) {
    const { localBookKeys } = nextProps.localBook;

    if (this.mount && localBookKeys.isLoaded) {
      if (this.props.localBook.localBookKeys.data.length !== localBookKeys.data.length) {
        this.setState({ selectedRows: localBookKeys.data });
      }

      if (this.firstLoad) {
        this.initDataFetching();
      }
    }
  }

  componentWillUnmount () {
    this.mount = false;
  }

  initDataFetching(page = 1) {
    const { editorId, collectionArray } = this.props;

    this.channel.getBooksByEditorAndCollections(editorId, collectionArray, this.limit, this.offset, (data) => {
      this.offset = this.limit * page;
      let newRows = this.convertBookArrayToMap(data.data);

      setTimeout(() => {
        this.setState({
          isLoaded: true,
          rows: newRows,
        });
      }, 500);
    });
  }

  /**
   * Will be called when refreshing
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  onFetch(page = 1, callback, options) {
    const { editorId, collectionArray } = this.props;
    const { rows } = this.state;
    let rowCount = null;

    if (this.firstLoad) {
      this.firstLoad = false;

      for (const i in rows) {
        rowCount += rows[i].length;
      }

      // TODO : all loaded
      if (rowCount < this.limit) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }

      return;
    }

    this.channel.getBooksByEditorAndCollections(editorId, collectionArray, this.limit, this.offset, (data) => {
      if (data.length !== 0 && data.data.length !== 0) {
        this.offset = this.limit * page;
        const newRows = this.convertBookArrayToMap(data.data);

        this.setState({ rows: newRows });

        if (data.data.length < this.limit) {
          callback(newRows, {
            allLoaded: true, // the end of the list is reached
          });
        } else {
          callback(newRows);
        }
      } else {
        callback([], {
          allLoaded: true, // the end of the list is reached
        });
      }
    });
  }

  convertBookArrayToMap(bookArray) {
    let releasedAtMap = this.state.rows;

    bookArray.forEach(function(bookItem) {
      const releasedAt = bookItem.releasedAt;
      const releasedAtFormat = moment(releasedAt.date).format('YYYY-MM');

      if (!releasedAtMap[releasedAtFormat]) {
        // Create an entry in the map for the year if it hasn't yet been created
        releasedAtMap[releasedAtFormat] = [];
      }

      releasedAtMap[releasedAtFormat].push(bookItem);
    });

    return releasedAtMap;
  }

  handleScroll(event) {
    LayoutAnimation.spring();

    if (event.nativeEvent.contentOffset.y >= 104 && this.state.h === 0) {
      this.setState({ h: 44 });
    } else if (event.nativeEvent.contentOffset.y < 104 && this.state.h === 44) {
      this.setState({ h: 0 });
    }
  }

  renderLoadingView() {
    return <LoadingView />;
  }

  renderHeaderView() {
    return <View style={{ height: 120, backgroundColor: 'transparent' }}></View>;
  }

  renderSectionHeaderView(sectionData, sectionID) {
    return <SectionHeaderView title={moment(sectionID, 'YYYY-MM').locale(MOMENT_LOCALE).format('MMMM')} />;
  }

  renderListRowView(row) {
    const { dispatch, navigator } = this.props;
    const { selectedRows } = this.state;
    const index = selectedRows.indexOf(row.canonicalName);
    const isChecked = (index > -1) ? true : false;

    return <BookRowView item={row}
                        isChecked={isChecked}
                        onCheckRow={(item) => dispatch(localBookActions.addBook(item))}
                        onUncheckRow={(item) => dispatch(localBookActions.removeBook(item))}
                        onPress={(item, isChecked, onCheckButtonPress) => navigator.push({
                          screen: 'comicscalendar.BookScreen',
                          title: row.name,
                          navigatorStyle: { navBarHidden: true, statusBarHidden: true },
                          passProps: {
                            item: item,
                            isChecked: isChecked,
                            onCheckButtonPress: onCheckButtonPress
                          },
                        })} />
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={rowStyle.rowSeparator} />
    );
  }

  render() {
    const { navigator } = this.props;
    const { isLoaded, displayNavbar, h } = this.state;
    const navbarStyleStatus = displayNavbar ? navbarStyle.comicsNavbarDisplayed : navbarStyle.comicsNavbarHidden;

    return (
      <View style={layoutStyle.mastContainer}>
        <BookHeaderView editor={this.props.editorConstant} />

        {isLoaded &&
          <View style={[layoutStyle.ListView, { position: 'absolute', top: 0, left: 0, backgroundColor: 'transparent' }]}>
            <SuperListView
              onFetch={this.onFetch}
              firstLoader={false}
              // renderEmptyView={this.renderLoadingView}
              renderHeaderView={this.renderHeaderView}
              renderSectionHeaderView={this.renderSectionHeaderView}
              renderListRowView={this.renderListRowView}
              withSections={true}
              initialListSize={this.limit}
              onScroll={Platform.OS === 'android' ? this.handleScroll : () => {}}
              scrollEventThrottle={16}
            />
          </View>
        }
        {Platform.OS === 'android' && <View style={[navbarStyle.comicsNavbar, { height: h }]} />}
        <BackButton navigator={navigator} />
        {!isLoaded &&
          <LoadingView />
        }
      </View>
    );
  }
}

BooksContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  editorId: PropTypes.number,
  editor: PropTypes.object,
  collectionArray: PropTypes.array,
  localBook: PropTypes.object,
}
