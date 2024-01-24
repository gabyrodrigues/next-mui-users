import { useContext } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import { maskPhone } from "@utils";
import { AutocompleteField } from "./AutocompleteField";
import { UserContext } from "@contexts/User";
import { TextField } from "@mui/material";

export function FormFields() {
  const { control } = useFormContext<FieldValues>();
  const { person, setPerson } = useContext(UserContext);

  return (
    <>
      <AutocompleteField
        name="pessoa"
        label="Pessoa"
        fieldValue={person}
        setFieldValue={setPerson}
      />

      <Controller
        name="telefone"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            label="Telefone"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
            value={field.value}
            onChange={(event) => {
              const formattedValue = maskPhone(event.target.value);
              field.onChange(formattedValue);
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="E-mail"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />
    </>
  );
}
