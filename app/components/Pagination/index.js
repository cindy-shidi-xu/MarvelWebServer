import React from 'react';
import PropTypes from 'prop-types';
import A from '../A';

function Pagination(props) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <A className="page-link" aria-label="Previous" onClick={props.backwardOnClick}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </A>
        </li>
        <li className="page-item">
          <A className="page-link" aria-label="Next" onClick={props.forwardOnClick}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </A>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  backwardOnClick: PropTypes.func,
  forwardOnClick: PropTypes.func,
};

export default Pagination;
