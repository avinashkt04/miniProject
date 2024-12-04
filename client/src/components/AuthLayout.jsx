import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./index";
import { useSelector } from "react-redux";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (authentication && !status) {
      navigate("/login");
    } else if (!authentication && status) {
      navigate(`/assistant`);
    }
    setLoader(false);
  }, [navigate, authentication, status]);

  return loader ? <Spinner className="w-9" /> : <>{children}</>;
}

export default AuthLayout;