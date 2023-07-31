
import PropTypes from 'prop-types';
const ConfirmationDialogue = ({ message,onConfirm, onCancel,onClose }) => {
    return (
      <div className="confirmation-dialog">
        <div className="message">{message}</div>
        <div className="buttons">
          <button className="form-element" onClick={onConfirm}>View Events</button>
          <button className="form-element" onClick={onCancel}>Add Event</button>
          <button className="form-element" onClick={onClose}>Close</button>

        </div>
      </div>
    );
  };

  ConfirmationDialogue.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  
  export default ConfirmationDialogue;