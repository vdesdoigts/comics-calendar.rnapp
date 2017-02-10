import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import I18n from '../../../i18n/i18n';

import AnimatedSpinnerView from './AnimatedSpinnerView';
import GiftedListView from 'react-native-gifted-listview';
import GiftedSpinner from 'react-native-gifted-spinner';

import buttonStyle from '../../styles/button';
import loadingStyle from '../../styles/loading';
import rowStyle from '../../styles/row';

export default class SuperListView extends Component {

  renderSeparatorView(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={rowStyle.rowSeparator} />
    );
  }

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        style={buttonStyle.buttonLoadMore}
        onPress={paginateCallback}
      >
        <Text style={buttonStyle.buttonLoadMoreText}>{I18n.t('load_more')}</Text>
      </TouchableHighlight>
    );
  }

  renderPaginationFetchingView() {
    return (
      <View style={loadingStyle.row}>
        <AnimatedSpinnerView image={require('../../../assets/images/loader-primary.png')} style={loadingStyle.spinnerRow} />
      </View>
    )
  }

  render() {
    const {
      onFetch,
      renderEmptyView,
      renderHeaderView,
      renderSectionHeaderView,
      renderListRowView,
      withSections,
      initialListSize,
      onScroll,
      scrollEventThrottle,
    } = this.props;

    return (
      <GiftedListView
        onFetch={onFetch}
        rowView={renderListRowView}
        firstLoader={false} // display a loader for the first fetching
        emptyView={renderEmptyView}
        pagination={true} // enable infinite scrolling using touch to load more
        refreshable={false} // enable pull-to-refresh for iOS and touch-to-refresh for Android
        headerView={renderHeaderView}
        withSections={withSections} // enable sections
        sectionHeaderView={renderSectionHeaderView}
        renderSeparator={this.renderSeparatorView}
        paginationWaitingView={this.renderPaginationWaitingView}
        paginationFetchingView={this.renderPaginationFetchingView}
        enableEmptySections={true}
        initialListSize={initialListSize}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
      />
    );
  }
}

SuperListView.propTypes = {
  onFetch: PropTypes.func,
  firstLoader: PropTypes.bool,
  renderEmptyView: PropTypes.func,
  renderHeaderView: PropTypes.func,
  renderSectionHeaderView: PropTypes.func,
  renderListRowView: PropTypes.func,
  withSections: PropTypes.bool,
  selectedRows: PropTypes.array,
  onCheckRow: PropTypes.func,
  onUncheckRow: PropTypes.func,
  onScroll: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
}

SuperListView.defaultProps = {
  selectedRows: [],
  onFetch: () => {},
  renderEmptyView: null,
  renderHeaderView: null,
  renderSectionHeaderView: null,
  renderListRowView: () => {},
  withSections: false,
  onCheckRow: () => {},
  onUncheckRow: () => {},
  onScroll: () => {},
  scrollEventThrottle: 16,
}
