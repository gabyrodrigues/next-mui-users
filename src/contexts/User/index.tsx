import { Dispatch, SetStateAction, createContext } from "react";
import { Person } from "@entities/Person";

interface UserProps {
  people: Person[];
  person: Person | null;
  setPerson: Dispatch<SetStateAction<Person | null>>;
  handleLoadPeople: () => Promise<void>;
}

export const UserContext = createContext({} as UserProps);
