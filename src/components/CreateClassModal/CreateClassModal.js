import React from 'react'
import PropTypes from 'prop-types'

import './CreateClassModal.scss'

const CreateClassModal = ({ closeModal, allocateSlotClicked }) => (
  <div className="modal-popup">
    <div className="modal-content">
      <h2 className="title">Create Class</h2>
      <div className="buttons-container">
        <button type="button" onClick={() => allocateSlotClicked("1On1")}>Allocate Slot</button>
        <button type="button" onClick={() => closeModal()}>Back</button>
      </div>
    </div>
  </div>
)

CreateClassModal.propTypes = {
  allocateSlotClicked: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default CreateClassModal
