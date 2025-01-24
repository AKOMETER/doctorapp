import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: any;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const [user, setUser] = useState<any>(null);

  async function getUser() {
    const _user = await AsyncStorage.getItem("user");
    if (_user) {
      setUser(JSON.parse(_user));
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isOpen: isOpen, toggleSidebar: toggleSidebar, user: user }}
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
