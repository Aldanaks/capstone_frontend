import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(true);
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
         <UserContext.Provider value={[user, setUser]}>
      <div className="App font-arial ">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" Component={Home} />

        </Routes>
      </div>
    </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
