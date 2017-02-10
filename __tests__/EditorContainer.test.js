import 'react-native';
import React from 'react';
import EditorContainer from '../app/components/EditorContainer';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('rn-splash-screen', () => { return { hide: () => {} }});

it('renders correctly', () => {
  const tree = renderer.create(
    <EditorContainer
      
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
