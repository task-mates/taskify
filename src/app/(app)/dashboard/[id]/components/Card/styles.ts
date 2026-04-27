import styled from 'styled-components';

export const Card = styled.article`
  width: 100%;
  padding: 20px;
  border-radius: 28px;
  background: #fff;
  border: 1px solid;

  display: flex;
  flex-direction: column;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 274px;
  margin-bottom: 20px;
  border-radius: 20px;
  object-fit: cover;
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333236;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export const DueDate = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #333236;
`;

export const Assignee = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  align-self: flex-end;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileFallback = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #00b894;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
`;
