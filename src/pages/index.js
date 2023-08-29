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
  const [loginD, setLoginD] = useState(false);
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
        {loginD ? (
          <Login />
        ) : (
          <>
            <Link href="/users/kitchen">
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(setUserId("clk2kivlz0001u6a897wriha1"));
                  dispatch(setUserRole("kitchen"));
                }}
              >
                Enter as kitchen
              </Button>
            </Link>
            <Link href="/users/supply">
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  dispatch(setUserId("cljcswv3000010vezy3rd8gx3"));
                  dispatch(setUserRole("supply"));
                }}
              >
                Enter as supply
              </Button>
            </Link>
            <Link href="/users/ceo">
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  dispatch(setUserId("clkmhos100001u6vkwk2vaihg"));
                  dispatch(setUserRole("ceo"));
                }}
              >
                Enter as CEO
              </Button>
            </Link>
            <Link href="/users/admin">
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  dispatch(setUserId("clj8wrd2700010vn9o5wf9z3x"));
                  dispatch(setUserRole("ceo"));
                }}
              >
                Enter as ADMIN
              </Button>
            </Link>
          </>
        )}
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
        <Button
          variant="outlined"
          onClick={() => {
            setLoginD(!loginD);
          }}
        >
          Login?
        </Button>
      </Container>
    </>
  );
}
