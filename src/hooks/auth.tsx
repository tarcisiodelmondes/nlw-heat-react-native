import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";

import { GITHUB_CLIENT_ID } from "@env";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE = "@dowhile:user";
const TOKEN_STORAGE = "@dowhile:token";

type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => void;
  singOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthorizationResponse = {
  params: { code?: string; error?: string };
  type: string;
};

const SCOPE = "read:user";

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(true);

  async function signIn() {
    try {
      setIsSigningIn(true);

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${SCOPE}`;

      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      console.log(isSigningIn);

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const { data } = await api.post<AuthResponse>("/authenticate", {
          code: authSessionResponse.params.code,
        });

        const { token, user } = data;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await AsyncStorage.setItem(TOKEN_STORAGE, token);
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }

    console.log(isSigningIn);
  }

  async function singOut() {
    setUser(null);
    await AsyncStorage.multiRemove([TOKEN_STORAGE, USER_STORAGE]);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);

      if (tokenStorage && userStorage) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;

        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ isSigningIn, signIn, singOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
