"use client";

import { Box, Container, Paper, Typography } from "@mui/material";
import { FormNewUser } from "@components/FormNewUser";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography
        align="center"
        fontWeight="bold"
        variant="h4"
        marginY={2}>
        Cadastrar novo usuário
      </Typography>
      <Box mt={2}>
        <Paper>
          <FormNewUser />
        </Paper>
      </Box>
    </Container>
  );
}
