import { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import * as z from "zod";

import { formSchema } from "./schema";
import { maskPhone } from "@utils";
import { AutocompleteField } from "@components/AutocompleteField";
import { Person } from "@entities/Person";

export function FormNewUser() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [person, setPerson] = useState<Person | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const submitRef = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pessoa: 0,
      telefone: "",
      email: ""
    }
  });
  const { control, formState, handleSubmit, reset } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    try {
      setOpenSnackbar(true);
      setFeedbackMessage("Usuário cadastrado com sucesso!");
      console.log("Dados cadastrados", values);

      reset();
      setPerson(null);
    } catch (error) {
      setOpenSnackbar(true);
      setFeedbackMessage("Aconteceu algum problema! Tente novamente mais tarde.");
      console.log(error);
    }

    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  return (
    <Box py={2}>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full">
          <Stack
            spacing={2}
            p={4}>
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
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            message={feedbackMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            autoHideDuration={2000}
          />
        )}
      </FormProvider>
    </Box>
  );
}
