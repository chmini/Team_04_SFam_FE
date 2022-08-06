<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from './MatchResult.styles';

const MatchResult = () => {
  const [select, setSelect] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const results = [
    { id: 1, text: '승리' },
    { id: 2, text: '패배' },
    { id: 3, text: '무승부' },
  ];
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const value = e.target as HTMLElement;
    const { innerText } = value;
    if (select === innerText) {
      setSelect('');
    } else {
      setSelect(innerText);
    }
  };
  return (
    <S.Container>
      {results.map((result) => (
        <S.ButtonContainer
          width=''
          height='45px'
          fontSize='20px'
          key={result.id}
          color={select === result.text ? 'select' : ''}
          onClick={onClick}
        >
          {result.text}
        </S.ButtonContainer>
      ))}
      <Link
        href={`/matches/${id as string}/review`}
        passHref
      >
        <S.SubmitBtn
          fontSize='20px'
          width=''
          height='45px'
        >
          제출
        </S.SubmitBtn>
      </Link>
    </S.Container>
  );
};
=======
import { Button } from '@components/Button';
import * as S from './MatchResult.styles';

const MatchResult = () => (
  <S.Container>
    <Button>승리</Button>
    <Button>무승부</Button>
    <Button>패배</Button>
    <Button>제출</Button>
  </S.Container>
);
>>>>>>> 16cded9 (feat: 경기 결과 페이지 버튼 생성)
=======
import { useState } from 'react';
import theme from '@styles/theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from './MatchResult.styles';

const MatchResult = () => {
  const [select, setSelect] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const results = [
    { id: 1, text: '승리' },
    { id: 2, text: '패배' },
    { id: 3, text: '무승부' },
  ];
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const value = e.target as HTMLElement;
    const { innerText } = value;
    if (select === innerText) {
      setSelect('');
    } else {
      setSelect(innerText);
    }
  };
  return (
    <S.Container>
      {results.map((result) => (
        <S.ButtonContainer
          key={result.id}
          color={select === result.text ? 'select' : ''}
          onClick={onClick}
        >
          {result.text}
        </S.ButtonContainer>
      ))}
      <Link
        href={`/matches/${id as string}/review`}
        passHref
      >
        <S.SubmitBtn>제출</S.SubmitBtn>
      </Link>
    </S.Container>
  );
};
>>>>>>> ab625fa (feat: 경기 결과 페이지 구현)

export default MatchResult;
