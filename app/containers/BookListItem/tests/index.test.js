/**
 * Test the repo list item
 */

import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'components/ListItem';
import { BookListItem } from '../index';

describe('<BookListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      thumbnail: {
        path: 'https://github.com/react-boilerplate/react-boilerplate',
        extension: 'jpg',
      },
      title: 'test title',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <BookListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });
});
