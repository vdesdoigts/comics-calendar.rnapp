import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Text,
  View,
} from 'react-native';
import I18n from '../../i18n/i18n';
import BackButton from './common/BackButton';
import SectionHeaderView from './common/SectionHeaderView';
import DefaultRowView from './common/DefaultRowView';
import DefaultSeparatorView from './common/DefaultSeparatorView';
import LoadingView from './common/LoadingView';
import rowStyle from '../styles/row';

import editorActions from '../actions/editor';
// import collectionActions from '../actions/collection';
// import localCollectionActions from '../actions/localCollection';
// import localBookActions from '../actions/localBook';

export default class ParameterContainer extends Component {

  constructor(props) {
    super(props);

    this.mount = true; // Control the state of mount
    this.state = {
      isLoaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.isLoaded !== nextState.isLoaded || this.props.editor.editorList.data.length !== nextProps.editor.editorList.data.length;
  // }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(editorActions.getEditorList());
  }

  componentWillReceiveProps(nextProps) {
    const { editorList } = nextProps.editor;
    const { dataSource } = this.state;

    if (this.mount) {
      this.setState({
        isLoaded: editorList.isLoaded,
        dataSource: dataSource.cloneWithRows(this.createOptions(editorList.data)),
      });
    }
  }

  componentWillUnmount () {
    this.mount = false;
  }

  createOptions(editorList) {
    const { navigator } = this.props;
    let options = [];

    editorList.map(editor => {
      options.push(
        {
          id: editor.id,
          label: I18n.t('manage_my', { message: editor.name }),
          action: () => navigator.push({
            screen: 'comicscalendar.CollectionScreen',
            title: editor.name,
            navigatorStyle: { navBarHidden: true, statusBarHidden: true },
            passProps: {
              parentEditor: editor
            },
          }),
        }
      );
    });

    // options.push(
    //   {
    //     id: 10000,
    //     label: 'Copyright',
    //     action: () => console.log('Copyright'),
    //   }
    // );

    return options;
  }

  renderRow(row) {
    return <DefaultRowView key={row.id} row={row} />;
  }

  renderSeparator(sectionID, rowID) {
    return <DefaultSeparatorView key={sectionID + rowID} />;
  }

  render() {
    const { navigator } = this.props;
    const { dataSource, isLoaded } = this.state;

    return (
      <View style={layoutStyle.mastContainer}>
        <SectionHeaderView title={I18n.t('parameters')} />
        <BackButton navigator={navigator} />

        {isLoaded
          ? <ListView
              dataSource={dataSource}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
            />
          : <LoadingView spinnerImage={require('../../assets/images/loader-primary.png')} />
        }
      </View>
    );
  }
}

ParameterContainer.propTypes = {
  dispatch: PropTypes.func,
  navigator: PropTypes.object.isRequired,
  editor: PropTypes.object,
}
