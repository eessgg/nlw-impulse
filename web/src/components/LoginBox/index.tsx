import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'

import styles from './styles.module.scss'
import { AuthContext } from '../../contexts/auth';



export default function LoginBox() {
  const {signInUrl, user } = useContext(AuthContext)

  console.log(user)

  
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e coompartilhe</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted />
        Entrar com Github
      </a>
      <h1>MessageList</h1>
    </div>
  )
}
