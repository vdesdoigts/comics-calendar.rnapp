import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  View
} from 'react-native';
import I18n from '../../i18n/i18n';
import Channel from '../channel';
import EditorHeaderView from '../components/editor/EditorHeaderView';
import SectionHeaderView from '../components/common/SectionHeaderView';
import EditorRowView from '../components/editor/EditorRowView';
import CallToActionParameterView from '../components/editor/CallToActionParameterView';
import LoadingView from './common/LoadingView';
import ParameterButton from '../components/common/ParameterButton';
import layoutStyle from '../styles/layout';

import localCollectionActions from '../actions/localCollection';

export default class EditorContainer extends Component {

  constructor(props) {
    super(props);

    this.channel = new Channel();
    this.measureRowHeight = this.measureRowHeight.bind(this);
    this.renderSectionHeaderView = this.renderSectionHeaderView.bind(this);
    this.renderListRowView = this.renderListRowView.bind(this);

    this.mount = false;
    this.listViewRowKey = 0;
    this.state = {
      isLoading: true,
      isLoaded: false,
      rowHeight: null,
      rowHeightIsDefined: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const hasNewLocalCollection = this.props.localCollection.localCollectionKeys.data.length !== nextProps.localCollection.localCollectionKeys.data.length;
  //   const hasNewData = this.state.dataSource.getRowCount() !== nextState.dataSource.getRowCount();
  //   return hasNewLocalCollection || hasNewData || this.state.isLoaded !== nextState.isLoaded || this.state.rowHeight !== nextState.rowHeight;
  // }

  componentDidMount () {
    this.mount = true;
    const { dispatch } = this.props;
    dispatch(localCollectionActions.getLocalCollections());
  }

  componentDidUpdate(nextState) {
    const { isLoaded, rowHeightIsDefined } = this.state;

    if (isLoaded && !rowHeightIsDefined) {
      setTimeout(this.measureRowHeight);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.mount && nextProps.localCollection.localCollectionKeys.isLoaded) {
      if (this.props.localCollection.localCollectionKeys.data.length !== nextProps.localCollection.localCollectionKeys.data.length) {
        this.channel.getEditorsByCollections(nextProps.localCollection.localCollectionKeys.data, (data) => {
          this.setState({
            isLoading: false,
            isLoaded: true,
            dataSource: this.state.dataSource.cloneWithRows(data.data),
          });
        });
      } else {
        this.setState({ isLoaded: true, isLoading: false });
      }
    }
  }

  componentWillUnmount () {
    this.mount = false;
  }

  measureRowHeight() {
    this.refs.welcome.measure((ox, oy, width, height) => {
      this.setState({
        rowHeight: height,
        rowHeightIsDefined: true,
      });
    });
  }

  renderHeaderView() {
    return <EditorHeaderView />
  }

  renderSectionHeaderView(sectionData, sectionID) {
    return <SectionHeaderView title={I18n.t(sectionID)} />;
  }

  renderSeparatorView(sectionID, rowID) {
    return (
      <View key={`${sectionID}-${rowID}`} style={{ height: 1, backgroundColor: '#fff' }} />
    );
  }

  renderListRowView(row) {
    const { navigator, localCollection } = this.props;
    const { rowHeight, dataSource } = this.state;
    this.listViewRowKey += 1;

    return <EditorRowView key={this.listViewRowKey}
                          item={row}
                          onPress={(editorId, editorConstant) => navigator.push({
                            screen: 'comicscalendar.BooksScreen',
                            title: row.name,
                            navigatorStyle: { navBarHidden: true, statusBarHidden: true },
                            passProps: {
                              editorId: editorId,
                              editorConstant: editorConstant,
                              collectionArray: localCollection.localCollectionKeys.data
                            }
                          })}
                          rowHeight={rowHeight / dataSource.getRowCount()} />;
  }

  render() {
    const { navigator } = this.props;
    const {
      isLoading,
      isLoaded,
      rowHeightIsDefined,
      dataSource,
    } = this.state;

    // If !isLoaded
    // Afficher l'écran de chargement
    // Else
    // Afficher le CTA ou la liste
    // If isLoaded and isLoading
    // Afficher un spinner par dessus la liste

    if (!isLoaded) {
      return <LoadingView backgroundImage={require('../../assets/images/landingpage-primary.jpg')} />;
    }

    return (
      <View style={layoutStyle.mastContainer}>
        <EditorHeaderView />
        <ParameterButton navigator={navigator} />
        <SectionHeaderView title={I18n.t('calendars')} />

        <View ref="welcome" style={{ flex: 1 }} collapsable={false}>
          {(dataSource.getRowCount() !== 0 && rowHeightIsDefined) &&
            <ListView
              dataSource={dataSource}
              renderSeparator={this.renderSeparatorView}
              renderRow={this.renderListRowView}
              enableEmptySections={true}
              automaticallyAdjustContentInsets={false}
            />
          }
          {dataSource.getRowCount() === 0 && <CallToActionParameterView navigator={navigator} />}
        </View>
        {(isLoaded && isLoading) && <LoadingView overlay={true} />}
      </View>
    );
  }
}

EditorContainer.propTypes = {
  dispatch: PropTypes.func,
  navigator: PropTypes.object,
  localCollection: PropTypes.object,
}
