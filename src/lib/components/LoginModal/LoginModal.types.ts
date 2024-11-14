import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type ILoginModalProps = object;
export type ILoginModalData = ILoginModalProps & {
  name: EModalName.LoginModal;
};
