import { FormEvent } from 'react';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { axiosAuthInstance } from '@api/axiosInstances';
import { useForm } from '@hooks/useForm';
import { useRouter } from 'next/router';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { userState } from '@recoil/atoms';
import { B3, BoldGreenB3, ColWrapper, Container, InnerWrapper } from '@styles/common';
import Link from 'next/link';
import { ErrorResponse, Values } from './types';
import validation from './helper';

const SignInForm = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const onSubmit = (values: Values, e?: FormEvent<HTMLFormElement>) => {
    const { username, password } = values;
    e?.preventDefault();
    const signin = async () => {
      try {
        const res = await axiosAuthInstance({
          method: 'post',
          url: '/api/users/signin',
          data: {
            username,
            password,
          },
        });
        if (res.status === 200) {
          setUser((res.data as { data: object }).data);
          router.replace('/');
        }
      } catch (err) {
        const { response } = err as AxiosError;
        if (response) {
          const errorCode = (response.data as ErrorResponse).code;
          if (errorCode === 'A0001') {
            window.alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          }
        }
      }
    };
    signin();
  };
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<Values>({
    initialValue: {
      username: '',
      password: '',
    },
    onSubmit,
    validate: validation,
  });
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <ColWrapper>
          <Input
            name='username'
            value={values.username}
            onChange={handleChange}
            placeholder='아이디'
            height='50px'
          />
          <span>{errors.username}</span>
          <Input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='비밀번호'
            height='50px'
          />
          <span>{errors.password}</span>
          <Button width='100%'>로그인</Button>
        </ColWrapper>
      </form>
      <InnerWrapper
        alignItems='center'
        justifyContent='center'
      >
        <B3>회원이 아니신가요?&nbsp;</B3>
        <Link href='/signup'>
          <BoldGreenB3>회원가입 하기</BoldGreenB3>
        </Link>
      </InnerWrapper>
    </Container>
  );
};

export default SignInForm;