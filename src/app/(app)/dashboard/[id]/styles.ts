import styled from 'styled-components';

export const Page = styled.main`
  min-height: 100vh;
  padding: 24px 28px;
  background: #eaf3fa;
  overflow-x: auto;
`;

export const Title = styled.h1`
  margin: 0 0 28px;
  font-size: 26px;
  font-weight: 700;
  color: #333236;
`;

export const Board = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;
  min-width: max-content;
`;

export const Column = styled.section`
  width: 280px;
  flex-shrink: 0;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  margin-bottom: 16px;
`;

export const ColumnTitle = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #333236;

  span {
    margin-left: 4px;
    font-size: 13px;
  }
`;

export const SettingButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
`;

export const AddCardButton = styled.button`
  width: 100%;
  height: 30px;
  margin-bottom: 16px;
  border: 0;
  border-radius: 4px;
  background: #fff;
  color: #76a5ea;
  cursor: pointer;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SideColumn = styled.aside`
  width: 250px;
  flex-shrink: 0;
`;

export const SideTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 22px;
  color: #fff;
  font-weight: 700;
`;

export const AddColumnButton = styled.button`
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 6px;
  background: #fff;
  color: #9fa6b2;
  font-size: 14px;
  cursor: pointer;
`;
