import { Dispatch, SetStateAction, createContext } from "react";
import { Person } from "@entities/Person";

interface UserProps {
  person: Person | null;
  setPerson: Dispatch<SetStateAction<Person | null>>;
  handleLoadPeople: () => Promise<Person[]>;
  handleSearchPeople: (search: string) => Promise<Person[]>;
}

export const UserContext = createContext({} as UserProps);
