import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';

import { axiosAuthInstance } from '@api/axiosInstances';
import { Avatar } from '@components/Avatar';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';
import { Dropdown, Item } from '@components/Dropdown';
import { Paragraph } from '@components/Paragraph';
import { SportsIcon } from '@components/SportsIcon';
import { MATCH_STATUS_DETAIL } from '@constants/dropdown';
import { MATCH_STATUS_TEXT, MATCH_TYPE_TEXT, SPORTS_TEXT } from '@constants/text';
import { Proposer } from '@interface/match';
import { Response } from '@interface/response';
import { userState } from '@recoil/atoms';
import { Anchor, B1, B2, B3, B4, BoldGrayB2, ColWrapper, GrayB3, InnerWrapper, RowWrapper } from '@styles/common';

import * as S from './MatchDetail.styles';
import { MatchDetail } from './types';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useRecoilState(userState);
  const [matchDetail, setMatchDetail] = React.useState<MatchDetail>();
  const [status, setStatus] = React.useState('');
  const [isAuthor, setIsAuthor] = React.useState(false);
  const [proposer, setProposal] = React.useState<Proposer | null>();

  const handleSelect = (item: Item<{ status: string }>) => {
    axiosAuthInstance.patch(`/api/matches/${id as string}`, {
      status: item.value.status,
    });
  };

  React.useEffect(() => {
    if (!router.isReady) return;
    try {
      (async () => {
        const {
          data: { data },
        } = await axiosAuthInstance.get<Response<MatchDetail>>(`/api/matches/${id as string}`);
        setMatchDetail(data);
        setIsAuthor(data.author.id === user.id);
        setStatus(data.status);
        setProposal(data.proposer);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [router.isReady]);

  return (
    <S.Container>
      <RowWrapper>
        <S.Title>{matchDetail?.title}</S.Title>
      </RowWrapper>
      <RowWrapper justifyContent='space-between'>
        <ColWrapper
          gap='16px'
          width='100%'
        >
          <div>
            <S.DetailTitle>작성자 </S.DetailTitle>
            <S.DetailItem> {matchDetail?.author.nickname}</S.DetailItem>
          </div>
          <div>
            <S.DetailTitle>종목 </S.DetailTitle>
            <S.DetailItem>{SPORTS_TEXT[matchDetail?.sportsCategory as string]} </S.DetailItem>
          </div>
          <div>
            <S.DetailTitle>개인전/팀전 </S.DetailTitle>
            <S.DetailItem>{MATCH_TYPE_TEXT[matchDetail?.matchType as string]} </S.DetailItem>
          </div>
          {matchDetail?.team && (
            <InnerWrapper flexDirection='column'>
              <InnerWrapper
                gap='16px'
                justifyContent='space-between'
                alignItems='center'
              >
                <InnerWrapper alignItems='center'>
                  <S.DetailTitle>팀 정보</S.DetailTitle>
                  {matchDetail.team && matchDetail.team.logoImageUrl ? (
                    <Avatar
                      imgSrc={matchDetail.team.logoImageUrl}
                      imgSize='32px'
                    />
                  ) : (
                    <Avatar imgSize='32px' />
                  )}
                  <InnerWrapper
                    flexDirection='column'
                    justifyContent='center'
                  >
                    <InnerWrapper>
                      <B2>{matchDetail.team.name}</B2>
                      <SportsIcon
                        sportsCategory={matchDetail.team.sportsCategory}
                        size={18}
                      />
                    </InnerWrapper>
                  </InnerWrapper>
                </InnerWrapper>
                <Link
                  href={`/team/${matchDetail.team.id}`}
                  passHref
                >
                  <Anchor>자세히 보기</Anchor>
                </Link>
              </InnerWrapper>
            </InnerWrapper>
          )}
          <div>
            <S.DetailTitle>경기인원 </S.DetailTitle>
            <S.DetailItem>{matchDetail?.participants}명</S.DetailItem>
          </div>
          <div>
            <S.DetailTitle>경기일자 </S.DetailTitle>
            <S.DetailItem>{matchDetail?.matchDate} </S.DetailItem>
          </div>
        </ColWrapper>
        <S.StatusWrapper>
          {isAuthor ? (
            <Dropdown
              round
              placeholder={MATCH_STATUS_TEXT[status]}
              items={MATCH_STATUS_DETAIL}
              onSelect={handleSelect}
            />
          ) : (
            <Badge
              fontSize='16px'
              width='auto'
              height='32px'
              color='secondary'
              padding
              matchStatus={status}
            >
              {MATCH_STATUS_TEXT[status]}
            </Badge>
          )}
        </S.StatusWrapper>
      </RowWrapper>
      <RowWrapper>
        <Paragraph width='100%'>{matchDetail?.content}</Paragraph>
      </RowWrapper>
      {isAuthor && (
        <Link
          href={`/matches/${id as string}/chatlist`}
          passHref
        >
          <Anchor>
            <Button>채팅 목록</Button>
          </Anchor>
        </Link>
      )}
      {!isAuthor && matchDetail?.proposer === null && (
        <Link
          href={`/matches/${id as string}/proposal`}
          passHref
        >
          <Anchor>
            <Button>대화 신청</Button>
          </Anchor>
        </Link>
      )}
      {!isAuthor && matchDetail?.proposer?.status === 'WAITING' && (
        <InnerWrapper
          gap='8px'
          flexDirection='column'
        >
          <Button
            disabled
            noPointer
          >
            채팅
          </Button>
          <S.Message>상대가 대화를 원하면 채팅 버튼이 활성화됩니다.</S.Message>
        </InnerWrapper>
      )}
      {!isAuthor && matchDetail?.proposer?.status === 'REFUSE' && (
        <div style={{ textAlign: 'center' }}>
          <BoldGrayB2>대화 신청이 거절되었습니다</BoldGrayB2>
        </div>
      )}
      {!isAuthor && matchDetail?.proposer?.status === 'APPROVED' && proposer && (
        <Link
          href={`/chatlist/${proposer.id}`}
          passHref
        >
          <Anchor>
            <Button>채팅</Button>
          </Anchor>
        </Link>
      )}
    </S.Container>
  );
};

export default PostDetail;
