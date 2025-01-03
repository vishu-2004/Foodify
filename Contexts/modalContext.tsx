
import React, { createContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  heading: string;
  message: string;
  btnText: string;
  openModal: (heading: string, message: string, btnText: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  heading: '',
  message: '',
  btnText: '',
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heading, setHeading] = useState('');
  const [message, setMessage] = useState('');
  const [btnText, setBtnText] = useState('');

  const openModal = (heading: string, message: string, btnText: string) => {
    setHeading(heading);
    setMessage(message);
    setBtnText(btnText);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setHeading('');
    setMessage('');
    setBtnText('');
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        heading,
        message,
        btnText,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};