/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';

import Wrapper from './Wrapper';
import Thumbnail from './Thumbnail';

export class BookListItem extends React.PureComponent {
  render() {
    const { id, title, thumbnail } = this.props.item;
    const thumbnailUrl = `${thumbnail.path}.${thumbnail.extension}`;
    const content = (
      <Wrapper>
        <Thumbnail src={thumbnailUrl} alt={title} />
        {title}
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${id}`} item={content} />
    );
  }
}

BookListItem.propTypes = {
  item: PropTypes.object,
};

export default connect()(BookListItem);
