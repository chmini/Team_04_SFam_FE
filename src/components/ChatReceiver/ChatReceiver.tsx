import { CgProfile } from 'react-icons/cg';

import { hourToString } from '@components/ChatSender/ChatSender';
import { Chat } from '@interface/chat';
import { GrayB4 } from '@styles/common';

import * as S from './ChatReceiver.styles';

interface Props {
  chat: Chat;
}

const ChatReceiver = ({ chat }: Props) => {
  const curChattedAt = chat.chattedAt.split('T')[1];
  const curChattedAtToString = `${hourToString(curChattedAt.slice(0, 2))}${curChattedAt.slice(2, 5)}`;
  return (
    <S.Container>
      <S.ChatWrapper>
        <S.ProfileWrapper>
          <CgProfile size='42px' />
        </S.ProfileWrapper>
        <S.MessageContentWrapper>
          <S.ProfileText>{chat.writer.id}</S.ProfileText>
          <S.ReceiverWrapper>
            <S.ChatText>{chat.content}</S.ChatText>
          </S.ReceiverWrapper>
        </S.MessageContentWrapper>
        <S.TimeWrapper>
          <GrayB4>{curChattedAtToString}</GrayB4>
        </S.TimeWrapper>
      </S.ChatWrapper>
    </S.Container>
  );
};

export default ChatReceiver;
