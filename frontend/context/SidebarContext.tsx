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
  isUserLoggedIn: IsUserLoggedInType | null;
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
      const fetchUserStatus = async () => {
        try {
          const res = await apiRequest.get("/user/is_logged");
          if (res) setIsUserLoggedIn(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchUserStatus();

      // Optional: return a cleanup if needed
      return () => {};
    }, []) // no dependency means this runs every focus
  );

  const [user, setUser] = useState<any>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] =
    useState<IsUserLoggedInType | null>(null);

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
  console.log("isUserLoggedIn", isUserLoggedIn);
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
