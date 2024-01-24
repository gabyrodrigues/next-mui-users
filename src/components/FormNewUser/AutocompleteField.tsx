import { Dispatch, SetStateAction, SyntheticEvent, useContext, useEffect, useState } from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { Person } from "@entities/Person";
import { UserContext } from "@contexts/User";

interface AutocompleteFieldProps {
  name: string;
  label: string;
  fieldValue: Person | null;
  setFieldValue: Dispatch<SetStateAction<Person | null>>;
}

export function AutocompleteField({
  name,
  label,
  fieldValue,
  setFieldValue
}: AutocompleteFieldProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Person[]>([]);

  const { control, setValue } = useFormContext<FieldValues>();
  const { people, handleLoadPeople } = useContext(UserContext);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await handleLoadPeople();

      if (active) {
        setOptions([...people]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, people, handleLoadPeople]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState }) => (
        <Autocomplete
          id={name}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          autoComplete
          loadingText="Carregando itens..."
          isOptionEqualToValue={(option, value) => option?.nome === value?.nome}
          getOptionLabel={(option) => option?.nome || ""}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
          value={fieldValue}
          onChange={(event: SyntheticEvent<Element, Event>, newValue: Person | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setFieldValue(newValue ?? null);
            setValue(name, newValue ? newValue.id : 0);
          }}
        />
      )}
    />
  );
}
