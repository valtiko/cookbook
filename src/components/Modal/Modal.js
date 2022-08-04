import React from 'react';
// import './Modal.scss';
import ReactDOM from 'react-dom';
import DeleteForm from '../molecules/DeleteForm/DeleteForm';
import PropTypes from 'prop-types';

const Modal = ({ isShowing, hide, recipeId }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog">
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="overlay"></div>
              <div className="modal-content">
                <DeleteForm hide={hide} recipeId={recipeId} />
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool,
  hide: PropTypes.func,
  recipeId: PropTypes.string,
};

export default Modal;
