import { useEffect } from "react";
import "./App.scss";
import ModalForm from "./Modal";
import DietPlan from "./pages/dietplan/DietPlan";
import Partnership from "./pages/Partnership/Partnership";

import { Switch, Route, Link } from "react-router-dom";

function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <>
      <Switch>
        <Route exact path="/">
          <ModalForm />
        </Route>
        <Route exact path="/1">
          <DietPlan />
        </Route>
        <Route exact path="/2">
          <Partnership />
        </Route>
      </Switch>
    </>
  );
}

export default App;
