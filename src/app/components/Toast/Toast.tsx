import React from 'react';
import '../../styles/toast.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="toastContainer">
      <div className="toast">
        <span>{message}</span>
        <button onClick={onClose} className="closeButton">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast; 