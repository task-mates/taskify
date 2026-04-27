import styled from 'styled-components';

export const Card = styled.article`
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  background: #fff;

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
  font-size: 18px;
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
  font-size: 12px;
  font-weight: 500;
`;

export const DueDate = styled.p`
  font-size: 12px;
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
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileFallback = styled.div`
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #00b894;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
`;
