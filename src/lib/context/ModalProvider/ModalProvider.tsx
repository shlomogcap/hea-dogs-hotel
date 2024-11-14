import { useContext, useState, createContext } from 'react';
import { EModalName } from './ModalName';
import {
  IModalContext,
  IModalData,
  IModalProviderProps,
} from './ModalProvider.types';

const ModalContext = createContext<IModalContext>({
  showModal: () => null,
  closeModal: () => null,
});

export const useModalContext = () => useContext(ModalContext);

const renderModal = (modalData: IModalData) => {
  switch (modalData.name) {
    default:
      return null;
  }
};

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalData, setModalData] = useState<IModalData | null>();
  const showModal = (data: IModalData) => {
    setModalData(data);
  };
  const closeModal = () => {
    setModalData(null);
  };
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalData && renderModal(modalData)}
    </ModalContext.Provider>
  );
};
