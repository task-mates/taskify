import { useState } from 'react';
import { getEmailError, getPasswordError } from '@/src/app/(public)/login/utils';

export type FormErrors = {
  email?: string;
  password?: string;
  common?: string;
};

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const setCommonError = (message?: string) => {
    setErrors((prev) => ({ ...prev, common: message }));
  };

  const handleEmailChange = (nextEmail: string) => {
    setEmail(nextEmail);
    if (emailTouched) {
      setErrors((prev) => ({ ...prev, email: getEmailError(nextEmail) }));
    }
  };

  const handlePasswordChange = (nextPassword: string) => {
    setPassword(nextPassword);
    if (passwordTouched) {
      setErrors((prev) => ({ ...prev, password: getPasswordError(nextPassword) }));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setErrors((prev) => ({ ...prev, email: getEmailError(email) }));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setErrors((prev) => ({ ...prev, password: getPasswordError(password) }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);

    if (emailError) nextErrors.email = emailError;
    if (passwordError) nextErrors.password = passwordError;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return {
    email,
    password,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    setErrors,
    setCommonError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    validate,
  };
}
