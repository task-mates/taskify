import { ButtonProps } from './type';
import * as S from './styles';

export default function Button({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <S.StyledButton type={type} onClick={onClick} $variant={variant}>
      {children}
    </S.StyledButton>
  );
}
