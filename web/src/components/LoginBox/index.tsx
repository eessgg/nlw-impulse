import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc'

import styles from './styles.module.scss'
import { api } from './../../services/api';

type AuthResponse ={ 
  token: string;
  user: {
    id:string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export default function LoginBox() {
  const signInUrl = 
  `https://github.com/login/oauth/authorize?scope=user&client_id=f7e26b0a118d48cc1d13`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const {token, user} = response.data;

    localStorage.setItem('@dowhile:token', token)
    console.log(user)
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if(hasGithubCode) {
      const [urlWithourCode, githubCode] = url.split('?code=')
      console.log({urlWithourCode, githubCode})

      window.history.pushState({}, '', urlWithourCode)

      signIn(githubCode)
    }


  }, [])

  
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
