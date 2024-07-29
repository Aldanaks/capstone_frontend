import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Topbar";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import CreatorsLink from "./pages/CreatorsLink";
import CustomerSupport from "./pages/CustomerSupport";
import ProductDetails from "./pages/ProductDetails";
import Receipt from "./pages/Receipt";

function App() {
  const [user, setUser] = useState();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider value={[user, setUser]}>
        <Navbar />
        <Routes>
          <Route path="/:creatorUsername" Component={CreatorsLink} />
          <Route path="/cart" Component={Cart} />
          <Route path="/CheckOut" Component={CheckOut} />
          <Route path="/productdetails/:productId" Component={ProductDetails} />
          <Route path="/receipt/:receiptId" Component={Receipt} />
          <Route path="/customersupport" Component={CustomerSupport} />
          <Route path="/creatorslink" Component={CreatorsLink} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
