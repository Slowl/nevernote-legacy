import { useContext, useEffect } from 'react'
import { useNavigate } from "@reach/router"
import { UserContext } from '../providers/userProvider'
import { signInWithGoogle } from '../config/firebase'
import { FcGoogle } from 'react-icons/fc'
import nevernoteLogo from '../img/nevernote-64.png'
import styled from 'styled-components'

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1c1c1c;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginBlock = styled.div`
  width: 22%;
  height: 55vh;
  background-color: #202020;
  border-radius: 16px;
  padding: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 45em) {
    width: 70%;
  }
`

const MessageBlock = styled.div`
  color: white;
  font-size: 1.1em;
  text-align: center;
  > div {
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
  @media screen and (max-width: 45em) {
    font-size: .95em;
  }
`

const LoginButton = styled.div`
  background-color: #2e2e2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .8em 1em !important;
  width: 50%;
  margin: 2em auto 0;
  border-radius: 50px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: .3s;
  svg {
    font-size: 1.3em;
  }

  :hover {
    border: 1px solid #8c3e3e;
  }
  @media screen and (max-width: 45em) {
    width: 80%;
  }
`

export default function Login() {
  const navigate = useNavigate()
  const user = useContext(UserContext)

  useEffect(() => {
    user && navigate('/')
  }, [user, navigate])

  return (
    <LoginPageContainer>
      <LoginBlock>
        <MessageBlock>
          <img src={nevernoteLogo} alt="nevernote logo"/>
          <div>Sorry, but this is a <b>private</b> app.</div>
          <div>If you have an access to the app, please authenticate with your Google Account</div>
          <LoginButton onClick={signInWithGoogle}>
            <FcGoogle /> Sign in
          </LoginButton>
        </MessageBlock>
      </LoginBlock>
    </LoginPageContainer>
  )
}
