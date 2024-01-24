import Image from "next/image";
import Link from "next/link";
import { AppBar, Box } from "@mui/material";

import logo from "@assets/img/logo.svg";
import { colors } from "@theme/colors";

export function Menu() {
  return (
    <AppBar
      position="static"
      color="primary"
      enableColorOnDark
      sx={{
        alignItems: "center",
        backgroundColor: `${colors.background}`,
        padding: "8px 0"
      }}>
      <Box
        maxWidth="lg"
        px={3}
        width="100%">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo Users"
            width={28}
          />
        </Link>
      </Box>
    </AppBar>
  );
}
