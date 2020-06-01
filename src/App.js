import React, { useContext } from "react";
import Auth from "./components/Auth";
import Ingredients from "./components/Ingredients/Ingredients";

import { AuthContext } from "./context/auth-context";

const App = props => {
  let authContext = useContext(AuthContext);

  return authContext.isAuth ? <Ingredients /> : <Auth />;
};

export default App;
