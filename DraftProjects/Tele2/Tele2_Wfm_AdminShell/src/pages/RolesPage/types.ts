export type ModalType = 'Operations' | 'Roles' | null;

export type ModalState = {
  type: ModalType;
  visible: boolean;
};
