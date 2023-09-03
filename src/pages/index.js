import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  setLogin,
  setUserFirstName,
  setUserLastName,
  setUserRole,
  setUserId,
  setUserAvatarUrl,
} from "@/store/loginSlice";
import LangOptions from "@/components/LangOptions";

import { Button, Container, Box } from "@mui/material";

import { useState } from "react";
import Login from "@/components/Login";

export default function Home() {
  const lang = useSelector((state) => state.lang.lang);
  return (
    <>
      {!lang && <LangOptions />}
      <Container
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {lang && <Login lang={lang} />}
      </Container>
    </>
  );
}
