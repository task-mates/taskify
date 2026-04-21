"use client";

import styled from "styled-components";
import Image from "next/image";
import LogoIcon from "@/public/images/icon-logo.svg";
import PlusIcon from "@/src/components/common/icons/icon-plus.svg";

export default function Sidebar() {
  return (
    <Wrapper>
      <Header>
        <Logo>
          <Image src={LogoIcon} alt="로고" />
        </Logo>
      </Header>

      <Body>
        <AddSection>
          <AddButton>
            <div>대시보드 추가</div>
            <IconContainer>
              <Image src={PlusIcon} alt="대시보드 추가" />
            </IconContainer>
          </AddButton>
        </AddSection>

        <DashboardList></DashboardList>
      </Body>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  width: 360px;
  height: 100vh;
  background: #f8f9fb;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333236;
`;

const Body = styled.div`
  overflow-y: auto;
`;

const AddSection = styled.div`
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const IconContainer = styled.div`
  background-color: #e1eaf1;
  padding: 3px 7px;
  border-radius: 4px;
`;

const DashboardList = styled.ul``;
