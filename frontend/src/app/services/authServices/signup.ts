import { httpClient } from "../HttpClient";

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export async function signUp(body: SignUpData) {
  const { data } = await httpClient.post<SignUpResponse>("/auth/signup", body);

  return data;
}
