import React from "react";
import { SlClose } from "react-icons/sl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-4 text-gray-600 hover:text-gray-800"
        >
          <SlClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
