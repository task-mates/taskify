'use client';

import LandingHeader from '@/src/components/layout/LandingHeader';
import LandingFooter from '@/src/components/layout/LandingFooter';
import * as S from './styles';

export default function Home() {
  return (
    <>
      <LandingHeader />
      <S.Container>
        <S.LandingWrapper>
          <S.Intro>
            <S.TextArea>
              <S.Title>
                더 새로워진 일정 관리
                <S.ServiceName>TASKIFY</S.ServiceName>
              </S.Title>

              <S.ButtonGroup>
                <S.SignupButton href="/signup">회원가입하기</S.SignupButton>
                <S.LoginButton href="/login">로그인하기</S.LoginButton>
              </S.ButtonGroup>
            </S.TextArea>

            <S.ImageArea>
              <S.MockImage
                src="/images/landing-dashboard.png"
                alt="Taskify 대시보드 미리보기"
              />
            </S.ImageArea>
          </S.Intro>

          <S.PointSection1>
            <S.Inner1>
              <S.PointTextArea>
                <S.PointText>Point 1</S.PointText>
                <S.PointTitle>
                  내가 등록한 사진으로
                  <br />
                  기억에 남는 할 일 리스트
                </S.PointTitle>
                <S.PointDescription>
                  <S.PointDescriptionPc>
                    카드 내 추가한 이미지를 섬네일로 노출하여
                    <br />
                    작업에 대한 내용을 더 직관적으로 파악할 수 있어요
                  </S.PointDescriptionPc>
                  <S.PointDescriptionMobile>
                    카드 내 추가한 이미지를
                    <br />
                    상단 썸네일로 노출하여 작업에 대한 내용을
                    <br />더 직관적으로 떠올릴 수 있어요
                  </S.PointDescriptionMobile>
                </S.PointDescription>
              </S.PointTextArea>
              <S.PointImageArea>
                <S.PointImage
                  src="/images/landing-carditem.png"
                  alt="할 일 카드 미리보기"
                />
              </S.PointImageArea>
            </S.Inner1>
          </S.PointSection1>

          <S.PointSection>
            <S.Inner>
              <S.PointTextArea2>
                <S.PointText>Point 2</S.PointText>
                <S.PointTitle>
                  자세한 정보는 명확하게,
                  <br />팀 논의는 빠르게 확인하세요
                </S.PointTitle>
                <S.PointDescription>
                  작업에 필요한 세부 내용을 손쉽게 정리하고,
                  <br />
                  댓글을 통해 팀원들과 빠르게 소통해보세요
                </S.PointDescription>
              </S.PointTextArea2>
              <S.PointImageArea2>
                <S.PointImage
                  src="/images/landing-todocard.png"
                  alt="할 일 카드 미리보기"
                />
              </S.PointImageArea2>
            </S.Inner>
            <S.PointDeco1>
              <S.PointDecoImage src="/images/landing-deco1.png" alt="" />
            </S.PointDeco1>
            <S.PointDeco2>
              <S.PointDecoImage src="/images/landing-deco2.png" alt="" />
            </S.PointDeco2>
          </S.PointSection>

          <S.PointSection>
            <S.Inner3>
              <S.PointTextArea>
                <S.PointText>Point 3</S.PointText>
                <S.PointTitle>
                  나에게 맞게, 더 효율적으로
                  <br />
                  생산성을 높이는 다양한 설정
                </S.PointTitle>
                <S.PointDescription>
                  <S.PointDescriptionPc>
                    작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수
                    있어요
                    <br />
                    환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
                  </S.PointDescriptionPc>
                  <S.PointDescriptionMobile>
                    작업 방식에 맞게 색상, 팀원, 구성원 등을
                    <br />
                    쉽게 관리할 수 있어요
                    <br />
                    환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
                  </S.PointDescriptionMobile>
                </S.PointDescription>
              </S.PointTextArea>
              <S.PointImageArea3>
                <S.PointImageList>
                  <S.PointImageItem>
                    <S.PointImage
                      src="/images/landing-info1.png"
                      alt="대시보드 설정"
                    />
                    <S.PointInfo>
                      <S.PointInfoTitle>대시보드 설정</S.PointInfoTitle>
                      <S.PointInfoDescription>
                        대시보드 사진과 이름을 변경할 수 있습니다.
                      </S.PointInfoDescription>
                    </S.PointInfo>
                  </S.PointImageItem>
                  <S.PointImageItem>
                    <S.PointImage src="/images/landing-info2.png" alt="초대" />
                    <S.PointInfo>
                      <S.PointInfoTitle>초대</S.PointInfoTitle>
                      <S.PointInfoDescription>
                        새로운 팀원을 초대할 수 있습니다.
                      </S.PointInfoDescription>
                    </S.PointInfo>
                  </S.PointImageItem>
                  <S.PointImageItem>
                    <S.PointImage
                      src="/images/landing-info3.png"
                      alt="구성원"
                    />
                    <S.PointInfo>
                      <S.PointInfoTitle>구성원</S.PointInfoTitle>
                      <S.PointInfoDescription>
                        구성원을 초대하고 내보낼 수 있습니다.
                      </S.PointInfoDescription>
                    </S.PointInfo>
                  </S.PointImageItem>
                </S.PointImageList>
              </S.PointImageArea3>
            </S.Inner3>
          </S.PointSection>
        </S.LandingWrapper>
      </S.Container>
      <LandingFooter />
    </>
  );
}
