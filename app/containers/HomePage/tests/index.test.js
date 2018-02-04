/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import BookList from 'components/BookList';
import { HomePage, mapDispatchToProps } from '../index';
import { changeTitle } from '../actions';
import { searchComics } from '../../App/actions';

describe('<HomePage />', () => {
  it('should render the repos list', () => {
    const renderedComponent = shallow(
      <HomePage loading error={false} repos={[]} />
    );
    expect(renderedComponent.contains(<BookList loading error={false} repos={[]} />)).toEqual(false);
  });

  it('should not call onSubmitForm if username is an empty string', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if username is null', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username=""
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onMoveForward', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onMoveForward).toBeDefined();
      });

      it('should dispatch changeTitle when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const title = 'title';
        result.onChangeTitle({ target: { value: 'title' } });
        expect(dispatch).toHaveBeenCalledWith(changeTitle(title));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch searchComics when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(searchComics());
      });
    });
  });
});
