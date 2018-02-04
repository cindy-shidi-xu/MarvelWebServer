import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import BookListItem from 'containers/BookListItem';

function BookList({ loading, error, books }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (books) {
    return <List items={books} component={BookListItem} />;
  }

  return null;
}

BookList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  books: PropTypes.any,
};

export default BookList;
