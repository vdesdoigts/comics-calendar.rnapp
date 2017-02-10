import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import localCollectionActions from '../actions/localCollection';
import I18n from '../../i18n/i18n';
import Channel from '../channel';
import BackButton from './common/BackButton';
import CollectionRowView from './collection/CollectionRowView';
import LoadingView from './common/LoadingView';
import SuperListView from './common/SuperListView';
import SectionHeaderView from './common/SectionHeaderView';
import layoutStyle from '../styles/layout';

export default class CollectionContainer extends Component {

  constructor(props) {
    super(props);

    this.channel = new Channel();
    this.onFetch = this.onFetch.bind(this);
    this.renderSectionHeaderView = this.renderSectionHeaderView.bind(this);
    this.renderListRowView = this.renderListRowView.bind(this);

    this.mount = false;
    this.firstLoad = true;
    this.limit = 40;
    this.offset = 0;
    this.state = {
      isLoaded: false,
      selectedRows: [],
      rows: {},
    };
  }

  componentDidMount() {
    this.mount = true;
    const { dispatch } = this.props;
    dispatch(localCollectionActions.getLocalCollections());
  }

  componentWillReceiveProps(nextProps) {
    const { localCollectionKeys } = nextProps.localCollection;

    if (this.mount && localCollectionKeys.isLoaded) {
      this.setState({ selectedRows: localCollectionKeys.data });

      if (this.firstLoad) {
        this.initDataFetching();
      }
    }
  }

  componentWillUnmount () {
    this.mount = false;
  }

  initDataFetching(page = 1) {
    this.channel.getCollectionsByEditor(this.props.parentEditor.id, this.limit, this.offset, (data) => {
      this.offset = this.limit * page;
      let newRows = {};
      newRows['Collections'] = data.data;

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
    const { rows } = this.state;

    if (this.firstLoad) {
      this.firstLoad = false;

      // TODO : chelou le Collections
      if (rows.Collections.length < this.limit) {
        callback(rows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(rows);
      }

      return;
    }

    this.channel.getCollectionsByEditor(this.props.parentEditor.id, this.limit, this.offset, (data) => {
      this.offset = this.limit * page;
      let newRows = {};

      if (rows['Collections'] && Array.isArray(rows['Collections'])) {
        newRows['Collections'] = rows['Collections'].concat(data.data);
      } else {
        newRows['Collections'] = data.data;
      }

      this.setState({ rows: newRows });

      if (data.data.length < this.limit) {
        callback(newRows, {
          allLoaded: true, // the end of the list is reached
        });
      } else {
        callback(newRows);
      }
    });
  }

  renderSectionHeaderView(sectionData, sectionID) {
    return <SectionHeaderView title={sectionID} />;
  }

  renderListRowView(row) {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const index = selectedRows.indexOf(row.canonicalName);
    const isChecked = (index > -1) ? true : false;

    return <CollectionRowView item={row}
                              isChecked={isChecked}
                              onCheckRow={(item) => dispatch(localCollectionActions.addCollection(item))}
                              onUncheckRow={(item) => dispatch(localCollectionActions.removeCollection(item))} />;
  }

  render() {
    const { navigator } = this.props;
    const { isLoaded } = this.state;

    return (
      <View style={layoutStyle.mastContainer}>
        <SectionHeaderView title={I18n.t('collections')} />
        <BackButton navigator={navigator} />

        {isLoaded
          ? <SuperListView
              onFetch={this.onFetch}
              firstLoader={false}
              renderHeaderView={this.renderHeaderView}
              renderListRowView={this.renderListRowView}
              withSections={true}
              initialListSize={this.limit}
            />
          : <LoadingView spinnerImage={require('../../assets/images/loader-primary.png')} />
        }
      </View>
    );
  }
}

CollectionContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  parentEditor: PropTypes.object,
  localCollection: PropTypes.object,
}
