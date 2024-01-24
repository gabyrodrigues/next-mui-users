"use client";
import { useState } from "react";

import { UserContext } from ".";
import { api } from "@services/api";
import { Person } from "@entities/Person";

interface UserContextProviderProps {
  children: React.ReactNode;
}

export default function UserContextProvider(props: UserContextProviderProps) {
  const [people, setPeople] = useState<Person[]>([]);

  async function handleLoadPeople() {
    try {
      const response = await api.get("/pessoas");

      setPeople(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    people,
    handleLoadPeople
  };

  return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>;
}