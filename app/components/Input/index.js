import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';

function Input(props) {
  return (
    <Form onSubmit={props.onSubmitForm}>
      <div className="input-group input-group-lg">
        <input
          type="text"
          id="title"
          placeholder="enter title..."
          value={props.title}
          onChange={props.onChangeTitle}
          className="form-control"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </Form>
  );
}

Input.propTypes = {
  onSubmitForm: PropTypes.func,
  onChangeTitle: PropTypes.func,
  title: PropTypes.string,
};

export default Input;
