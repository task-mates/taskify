"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";
import Image from "next/image";
import LogoIcon from "@/public/images/icon-logo.svg";
import PlusIcon from "@/src/components/layout/icons/icon-plus.svg";
import CrownIcon from "@/src/components/layout/icons/icon-crown.svg";
import { DEVICE } from "@/src/styles/Breakpoints";

//API 연동 후 삭제 예정
const dashboardsList = [
  { id: 1, title: "포트폴리오", color: "#7AC555", createdByMe: true },
  { id: 2, title: "코드잇", color: "#760DDE", createdByMe: true },
  { id: 3, title: "3분기 계획", color: "#FFA500", createdByMe: true },
  { id: 4, title: "회의록", color: "#FF5C5C", createdByMe: false },
  { id: 5, title: "중요 문서함", color: "#0D3F8F", createdByMe: true },
  { id: 6, title: "마케팅 전략", color: "#4CAF50", createdByMe: false },
  { id: 7, title: "디자인 시스템", color: "#9C27B0", createdByMe: false },
  { id: 8, title: "백엔드 작업", color: "#3F51B5", createdByMe: false },
  { id: 9, title: "프론트 개선", color: "#2196F3", createdByMe: true },
  { id: 10, title: "버그 트래킹", color: "#FF9800", createdByMe: false },
  { id: 11, title: "고객 피드백", color: "#795548", createdByMe: false },
  { id: 12, title: "온보딩 개선", color: "#607D8B", createdByMe: false },
  { id: 13, title: "QA 테스트", color: "#E91E63", createdByMe: true },
  { id: 14, title: "데이터 분석", color: "#00BCD4", createdByMe: false },
  { id: 15, title: "운영 관리", color: "#8BC34A", createdByMe: false },
  { id: 16, title: "리팩토링", color: "#CDDC39", createdByMe: true },
  { id: 17, title: "신규 기능 개발", color: "#FFC107", createdByMe: true },
  { id: 18, title: "배포 관리", color: "#FF5722", createdByMe: false },
  { id: 19, title: "문서 정리", color: "#673AB7", createdByMe: false },
  { id: 20, title: "기획 아이디어", color: "#009688", createdByMe: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Wrapper $isOpen={isOpen}>
      <Header>
        <TopRow>
          <Logo>
            <Image src={LogoIcon} alt="Taskify 로고" />
          </Logo>
          {/* 논의 후 아이콘으로 변경 예정 */}
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            ✕
          </CloseButton>
        </TopRow>
        <AddSection>
          <AddButton>
            <span>대시보드 추가</span>
            <IconContainer>
              <Image src={PlusIcon} alt="" />
            </IconContainer>
          </AddButton>
        </AddSection>
      </Header>

      <Body>
        <DashboardList>
          {dashboardsList.map((board) => (
            <DashboardItem
              key={board.id}
              $active={pathname === `/dashboard/${board.id}`}
            >
              <Link href={`/dashboard/${board.id}`}>
                <ColorDot $color={board.color} />
                <Title>{board.title}</Title>
                {board.createdByMe && <Image src={CrownIcon} alt="" />}
              </Link>
            </DashboardItem>
          ))}
        </DashboardList>
      </Body>
    </Wrapper>
  );
}

const Wrapper = styled.aside<{ $isOpen: boolean }>`
  width: 360px;
  height: 100vh;

  background: #f8f9fb;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media ${DEVICE.tablet} {
    width: 280px;
  }

  @media ${DEVICE.mobile} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 280px;
    max-width: 80vw;
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease;
  }
`;

const CloseButton = styled.button`
  display: none;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  padding: 2px;

  @media ${DEVICE.mobile} {
    display: block;
  }
`;

const Header = styled.header`
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Logo = styled.div`
  margin-bottom: 18px;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AddSection = styled.div``;

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

const DashboardList = styled.ul`
  margin: 0;
  padding: 20px;
  list-style: none;
`;

const DashboardItem = styled.li<{ $active: boolean }>`
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#CADFE7" : "transparent")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "#CADFE7" : "#eef3f8")};
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px 20px;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
  }
`;

const Title = styled.span`
  flex: 1;
`;

const ColorDot = styled.div<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 20px;
`;
