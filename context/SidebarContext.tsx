import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IsUserLoggedInType } from "@/utils/dataTypes";
import { defaultIsUserLogged } from "@/utils/default";
import apiRequest from "@/services/apiRequest";
import { useFocusEffect } from "expo-router";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: any;
  setUser: any;
  token: string;
  setToken: any;
  isUserLoggedIn: Record<string, any>;
  setIsUserLoggedIn: any;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useFocusEffect(
    useCallback(() => {
      apiRequest
        .get("/user/is_logged")
        .then((res) => {
          if (res) setIsUserLoggedIn(res?.data);
        })
        .catch((err) => console.log(err));
    }, [])
  );

  const [user, setUser] = useState<any>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] =
    useState<IsUserLoggedInType>(defaultIsUserLogged);

  const [token, setToken] = useState<any>(null);

  async function getUser() {
    const _user = await AsyncStorage.getItem("user");
    if (_user) {
      setUser(JSON.parse(_user));
    }

    const _token = await AsyncStorage.getItem("token");
    if (_token) {
      setToken(JSON.parse(_token));
    }
  }

  useEffect(() => {
    if (typeof user == "string") {
      setUser(JSON.parse(user));
    }
  }, [setUser, user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen: isOpen,
        toggleSidebar: toggleSidebar,
        user: user,
        setUser,
        token,
        isUserLoggedIn,
        setIsUserLoggedIn,
        setToken,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
