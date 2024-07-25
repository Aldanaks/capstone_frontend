import { Route, Routes, useNavigate } from "react-router-dom";
import UserContext, { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import Receipt from "./pages/Receipt";
import CustomerSupport from "./pages/CustomerSupport";
import CreatorsLink from "./pages/CreatorsLink";

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
