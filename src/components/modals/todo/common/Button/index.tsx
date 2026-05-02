import { ButtonProps } from './type';
import * as S from './styles';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <S.StyledButton type={type} $variant={variant} {...rest}>
      {children}
    </S.StyledButton>
  );
}
