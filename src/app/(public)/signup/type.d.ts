export type ModalType = 'success' | 'duplicate' | 'error' | null;

export type SignupDraft = {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
  isTermsChecked: boolean;
};
