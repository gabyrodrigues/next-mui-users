import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField
} from "@mui/material";
import * as z from "zod";

import { formSchema } from "./schema";
import { Person } from "@entities/Person";
import { UserContext } from "@contexts/User";
import { maskPhone } from "@utils";

export function FormNewUser() {
  const [person, setPerson] = useState<Person | null>(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState<readonly Person[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const { people, handleLoadPeople } = useContext(UserContext);

  const submitRef = useRef<HTMLButtonElement | null>(null);
  const loading = openOptions && options.length === 0;

  const { control, formState, handleSubmit, reset, setValue } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        pessoa: 0,
        telefone: "",
        email: ""
      }
    }
  );

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
    if (!openOptions) {
      setOptions([]);
    }
  }, [openOptions]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    try {
      setFeedbackMessage("Usuário cadastrado com sucesso!");
      console.log("Dados cadastrados", values);
      reset();
      setPerson(null);
    } catch (error) {
      console.log(error);
      setFeedbackMessage("Aconteceu algum problema! Tente novamente mais tarde.");
    }

    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  return (
    <Box py={2}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full">
        <Stack
          spacing={2}
          p={4}>
          <Controller
            name="pessoa"
            control={control}
            render={({ fieldState }) => (
              <Autocomplete
                id="pessoa"
                open={openOptions}
                onOpen={() => {
                  setOpenOptions(true);
                }}
                onClose={() => {
                  setOpenOptions(false);
                }}
                autoComplete
                loadingText="Carregando usuários..."
                isOptionEqualToValue={(option, value) => option.nome === value.nome}
                getOptionLabel={(option) => option.nome}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pessoa"
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
                value={person}
                onChange={(event: SyntheticEvent<Element, Event>, newValue: Person | null) => {
                  setOptions(newValue ? [newValue, ...options] : options);
                  setPerson(newValue ?? null);
                  setValue("pessoa", newValue ? newValue.id : 0);
                }}
              />
            )}
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

          <Button
            disabled={!formState.isValid}
            variant="contained"
            ref={submitRef}
            type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>

      {!!feedbackMessage && (
        <Snackbar
          open={!!feedbackMessage}
          message={feedbackMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={3000}
        />
      )}
    </Box>
  );
}
