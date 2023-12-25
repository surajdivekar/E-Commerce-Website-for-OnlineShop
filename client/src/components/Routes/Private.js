import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import MySpinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth]);

  //   const authCheck = async () => {
  //     const res = await axios.get("/api/v1/auth/user-auth", {
  //         headers: {
  //           Authorization: auth?.token,
  //         },
  //       });

  //     if (res.data.ok) {
  //       setOk(true);
  //     } else {
  //       setOk(false);
  //     }
  //   };
  //   if (auth?.token) authCheck();
  //     }, [auth?.token]);

  return ok ? <Outlet /> : <MySpinner />;
}
