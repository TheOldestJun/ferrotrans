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
  const imgUrl = "/logo_transparent.png";
  const login = useSelector((state) => state.login.login);
  const lang = useSelector((state) => state.lang.lang);
  const userRole = useSelector((state) => state.login.role);
  const dispatch = useDispatch();
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
        <Box
          component="div"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: "0.3",
            zIndex: "-100",
          }}
        />
        {lang && <Login lang={lang} />}
      </Container>
    </>
  );
}
