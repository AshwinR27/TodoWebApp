"use client";

const DeleteConfirmation = ({ onConfirm, onCancel, itemCount }) => {
  return (
    <div className="confirmation-dialog">
      <div className="dialog-content">
        <h3>Are you sure you want to delete {itemCount} item(s)?</h3>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
