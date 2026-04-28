'use client';

import Image from 'next/image';
import { useState } from 'react';
import * as S from './styles';

const faqList = [
  {
    question: '커뮤니티는 어떻게 만들 수 있나요?',
    answer:
      '로그인 후 나의 대시보드 페이지에서 새로운 대시보드를 생성 후, 대시보드 수정하기 페이지에서 구성원을 초대할 수 있습니다.',
  },
  {
    question: '멤버 초대는 어떤 방식으로 진행되나요?',
    answer:
      '로그인 후 나의 대시보드 페이지에서 새로운 대시보드를 생성 후, 대시보드 수정하기 페이지에서 이메일 기반 초대를 통해 멤버를 추가할 수 있습니다.',
  },
  {
    question: '일정 카드는 어떤 정보까지 공유할 수 있나요?',
    answer:
      '일정 제목, 설명, 마감일, 담당자, 태그, 이미지를 카드 형태로 등록할 수 있고 커뮤니티 내 멤버가 동일한 카드 내용을 함께 확인할 수 있습니다.',
  },
  {
    question: '할 일 목록은 어떤 기준으로 분류가 가능한가요?',
    answer: 'Taskify는 대시보드 내 칼럼을 통해 일정을 분류할 수 있습니다.',
  },
  {
    question: '댓글 기능은 어떤 상황에서 유용한가요?',
    answer:
      '해당 할 일 카드별 진행 상황 공유, 요청사항 기록, 피드백 정리에 활용할 수 있어 커뮤니티 내 의사소통을 한 곳에서 관리하기 좋습니다.',
  },
  {
    question: '실수로 삭제한 할 일을 복구할 수 있나요?',
    answer:
      '현재 버전에서는 즉시 복구 기능을 지원하지 않으므로, 삭제 전 모달에서 확인이 필요합니다.',
  },
  {
    question: 'Taskify는 어떤 기기에서 사용할 수 있나요?',
    answer:
      'Taskify는 웹 기반 서비스이기 때문에 PC, 테블릿 모바일 브라우저에서 모두 이용할 수 있으며, 반응형 UI로 주요 기능을 동일하게 사용할 수 있습니다.',
  },
] as const;

export default function FaqPage() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const handleToggle = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((openQuestion) => openQuestion !== question)
        : [...prev, question]
    );
  };

  return (
    <S.Main>
      <S.Content>
        <S.HomeLink href="/" aria-label="메인 페이지로 이동">
          <Image src="/images/icon-logo.svg" alt="Taskify 로고" fill priority />
        </S.HomeLink>
        <S.Title>자주 묻는 질문</S.Title>
        <S.Description>
          Taskify 이용 중 자주 질문하는 내용을 모았습니다.
        </S.Description>

        <S.ListSection>
          {faqList.map((faq, index) => (
            <S.Item key={faq.question}>
              <S.ToggleButton
                type="button"
                onClick={() => handleToggle(faq.question)}
                aria-expanded={openQuestions.includes(faq.question)}
                aria-controls={`faq-answer-${index}`}
              >
                <S.QuestionTitle>
                  <S.LeftToggleIcon aria-hidden="true">
                    {openQuestions.includes(faq.question) ? '▾' : '▸'}
                  </S.LeftToggleIcon>
                  {faq.question}
                </S.QuestionTitle>
                <S.RightToggleIcon>
                  {openQuestions.includes(faq.question) ? '−' : '+'}
                </S.RightToggleIcon>
              </S.ToggleButton>
              {openQuestions.includes(faq.question) && (
                <S.Answer id={`faq-answer-${index}`}>{faq.answer}</S.Answer>
              )}
            </S.Item>
          ))}
        </S.ListSection>
      </S.Content>
    </S.Main>
  );
}
