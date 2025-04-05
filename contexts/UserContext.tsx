import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  actions: string[];
}

interface UserContext {
  user: User | null | undefined;
  saveName: (name: string) => void;
  saveActions: (actions: string[]) => void;
  clearUser: () => void;
}

export const userContext = createContext<UserContext | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  function saveName(newName: string) {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, name: newName };
      } else {
        return { name: newName, actions: [] };
      }
    });
  }

  function saveActions(actions: string[]) {
    if (!user) {
      return;
    }

    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, actions };
      }
    });
  }

  function clearUser() {
    setUser(null);
    AsyncStorage.removeItem("name");
    AsyncStorage.removeItem("actions");
  }

  useEffect(() => {
    async function loadUser() {
      const name = await AsyncStorage.getItem("name");
      const actions = await AsyncStorage.getItem("actions");

      if (name) {
        setUser({
          name,
          actions: actions ? JSON.parse(actions) : [],
        });

        return;
      }

      setUser(null);
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function saveUser() {
      if (user) {
        await AsyncStorage.setItem("name", user.name);
        await AsyncStorage.setItem("actions", JSON.stringify(user.actions));
      }
    }

    saveUser();
  }, [user]);

  return (
    <userContext.Provider
      value={{
        user,
        saveName,
        saveActions,
        clearUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const user = useContext(userContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}