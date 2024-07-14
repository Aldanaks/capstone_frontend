import { Routes, useNavigate } from "react-router-dom";

import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={[user, setUser]}>
        <Routes></Routes>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
