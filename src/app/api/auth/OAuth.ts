// import axios from 'axios';mo
import { AUTH_SERVER_URL } from '../endpoints';

export async function signInWithGoogle(mode: string, role?: string) {
  let url = `${AUTH_SERVER_URL}/auth/google/login`;

  if (role) {
    url += `?role=${role}&mode=${mode}`;
  } else {
    url += `?mode=${mode}`;
  }

  window.location.href = url;
}