import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { Autocomplete, TextField, debounce } from "@mui/material";

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
  const [options, setOptions] = useState<readonly Person[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { control, setValue } = useFormContext<FieldValues>();
  const { handleSearchPeople } = useContext(UserContext);

  const searchRequestRef = useRef<any>(null);
  const activeRef = useRef(true);

  const searchPeopleDelayed = useMemo(
    () =>
      debounce(async (search: string) => {
        if (!activeRef.current) return;

        const results = await handleSearchPeople(search);
        searchRequestRef.current = search.trim();
        setOptions(results || []);
      }, 400),
    [handleSearchPeople]
  );

  useEffect(() => {
    activeRef.current = true;

    if (inputValue === "") {
      setOptions(fieldValue ? [fieldValue] : []);
      return () => {
        activeRef.current = false;
      };
    }

    if (inputValue.trim() !== searchRequestRef.current) {
      searchPeopleDelayed(inputValue.trim());
    }

    return () => {
      activeRef.current = false;
    };
  }, [fieldValue, inputValue, searchPeopleDelayed]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState }) => (
        <Autocomplete
          id={name}
          getOptionLabel={(option) => option?.nome || ""}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={fieldValue}
          noOptionsText={options.length ? "" : "Realize uma busca"}
          onChange={(event: SyntheticEvent<Element, Event>, newValue: Person | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(name, newValue ? +newValue.id : 0);
            setFieldValue(newValue ?? null);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          isOptionEqualToValue={(option, value) => option?.nome === value?.nome}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
            />
          )}
        />
      )}
    />
  );
}
