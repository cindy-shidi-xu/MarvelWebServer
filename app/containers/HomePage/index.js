/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError, makeSelectBooks, makeSelectTotalNumber } from 'containers/App/selectors';
import H2 from 'components/H2';
import BookList from 'components/BookList';
import Input from 'components/Input';
import Pagination from 'components/Pagination';

import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import { searchComics } from '../App/actions';
import { changeTitle, changeOffset } from './actions';
import { makeSelectUsername, makeSelectTitle, makeSelectOffset } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.onSubmitForm();
  }

  render() {
    const { loading, error, books, totalNumber, offset, onSubmitForm, onChangeTitle, title } = this.props;
    const bookListProps = {
      loading,
      error,
      books,
    };

    const inputProps = {
      onSubmitForm,
      onChangeTitle,
      title,
    };

    const backwardOnClick = offset > 0 ? this.props.onMoveBackward : null;
    const forwardOnClick = offset < totalNumber ? this.props.onMoveForward : null;
    const paginationProps = {
      backwardOnClick,
      forwardOnClick,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Marvel comic books title search homepage" />
        </Helmet>
        <div>
          <CenteredSection>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.searchTitleHeader} />
            </H2>
            <Input {...inputProps} />
            <BookList {...bookListProps} />
            <Pagination {...paginationProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  books: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  title: PropTypes.string,
  offset: PropTypes.number,
  onChangeTitle: PropTypes.func,
  onMoveForward: PropTypes.func,
  onMoveBackward: PropTypes.func,
  totalNumber: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeTitle: (evt) => dispatch(changeTitle(evt.target.value)),
    onSubmitForm: () => {
      dispatch(searchComics());
    },
    onMoveForward: () => {
      dispatch(changeOffset(20));
      dispatch(searchComics());
    },

    onMoveBackward: () => {
      dispatch(changeOffset(-20));
      dispatch(searchComics());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  books: makeSelectBooks(),
  username: makeSelectUsername(),
  title: makeSelectTitle(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  offset: makeSelectOffset(),
  totalNumber: makeSelectTotalNumber(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
