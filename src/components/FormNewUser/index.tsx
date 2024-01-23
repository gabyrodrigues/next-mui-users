import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import * as z from "zod";

import { formSchema } from "./schema";
import { Person } from "@entities/Person";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function FormNewUser() {
  const [phone, setPhone] = useState("");
  const [person, setPerson] = useState<Person | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Person[]>([]);

  const submitRef = useRef<HTMLButtonElement | null>(null);
  const loading = open && options.length === 0;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pessoa: 1,
      telefone: "",
      email: ""
    }
  });

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([
          ...[
            {
              id: 1,
              nome: "Random Name"
            }
          ]
        ]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    try {
      console.log("Produto cadastrado com sucesso!", values);
      reset();
      setPhone("");
    } catch (error) {
      console.log(error);
      console.log("Aconteceu algum problema!", "Tente novamente mais tarde.");
    }

    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  console.log(getValues("email"), getValues("pessoa"), getValues("telefone"));

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
            render={() => (
              <Autocomplete
                id="pessoa"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                autoComplete
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
                  />
                )}
                value={person}
                onChange={(event: SyntheticEvent<Element, Event>, newValue: Person | null) => {
                  console.log("change autocomplete", event, newValue);
                  setOptions(newValue ? [newValue, ...options] : options);
                  setPerson(newValue ?? null);
                  setValue("pessoa", newValue ? newValue.id : 0);
                }}
              />
            )}
          />
          {errors.pessoa && <span>{errors.pessoa.message}</span>}

          <Controller
            name="telefone"
            control={control}
            render={() => (
              <TextField
                label="Telefone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setValue("telefone", event.target.value);
                }}
              />
            )}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="E-mail"
                {...field}
              />
            )}
          />
          {errors.email && <span>{errors.email.message}</span>}

          <Button
            disabled={!getValues("pessoa") || !getValues("telefone") || !getValues("email")}
            variant="contained"
            ref={submitRef}
            type="submit">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
