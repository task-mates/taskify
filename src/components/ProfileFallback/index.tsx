import styled from 'styled-components';
import { getProfileColorByNickname } from '@/src/utils/profileColor';

export default function ProfileFallback({ nickname }: { nickname?: string }) {
  return (
    <Wrapper
      style={{
        background: nickname ? getProfileColorByNickname(nickname) : '',
      }}
    >
      {nickname?.[0] ?? '?'}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: var(--color-white);
  font: var(--lg-14px-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`;
