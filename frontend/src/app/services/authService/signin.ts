import { httpClient } from "../HttpClient";

export interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
}

export async function signIn(body: SignInData) {
  const { data } = await httpClient.post<SignInResponse>("/auth/signin", body);

  return data;
}
