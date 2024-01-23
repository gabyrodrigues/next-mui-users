import { createContext } from "react";
import { Person } from "@entities/Person";

interface UserProps {
  people: Person[];
  handleLoadPeople: () => Promise<void>;
}

export const UserContext = createContext({} as UserProps);
