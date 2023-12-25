import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import MySpinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token && auth?.user?.role === 1) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth, navigate]);

  return ok ? <Outlet /> : <MySpinner path="" />;
}
