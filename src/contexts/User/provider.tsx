"use client";
import { useState } from "react";

import { UserContext } from ".";
import { api } from "@services/api";
import { Person } from "@entities/Person";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function UserContextProvider(props: UserContextProviderProps) {
  const [person, setPerson] = useState<Person | null>(null);

  async function handleLoadPeople(): Promise<Person[]> {
    try {
      const response = await api.get("/pessoas");

      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function handleSearchPeople(search: string): Promise<Person[]> {
    try {
      const people = await handleLoadPeople();

      const filteredPeople = search
        ? people.filter((item: Person) => item.nome.toLowerCase().includes(search.toLowerCase()))
        : [];
      return filteredPeople;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const values = {
    person,
    setPerson,
    handleLoadPeople,
    handleSearchPeople
  };

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
}
