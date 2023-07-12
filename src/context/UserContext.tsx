import { createContext, useState } from "react";

type UserContextType = {
  isLoggedIn: boolean,
  id: number;
  name: string;
}

type PropsUserContext = {
  state: UserContextType,
  setState: React.Dispatch<React.SetStateAction<UserContextType>>
}

const DEFAULT_VALUE: PropsUserContext = {
  state: {
    isLoggedIn: false,
    id: 0,
    name: ""   
  },
  setState: () => {}
}

const UserContext = createContext<PropsUserContext>(DEFAULT_VALUE);

interface IUseUser {
  children: React.ReactNode
}

const UserContextProvider = (props: IUseUser) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);

  return (
    <UserContext.Provider
      value={{
        state,
        setState
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
};

export { UserContextProvider }
export default UserContext