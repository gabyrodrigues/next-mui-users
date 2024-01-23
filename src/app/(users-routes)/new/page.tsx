"use client";

import { Box, Container, Typography } from "@mui/material";

export default function New() {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        fontWeight="bold"
        component="h4">
        Lista de usuários
      </Typography>
      <Box mt={2}></Box>
    </Container>
  );
}
