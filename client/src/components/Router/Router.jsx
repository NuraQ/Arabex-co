import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { NonAuthRoutes } from "../../constants/routes";
import Elem from "../../Elem";
import Upperbar from "../UpperBar/Upperbar";
import newHistory from "./history";
import withAuth from "./withAuth";

const About = lazy(() => import("../../containers/AboutUs/About"));
const Add = lazy(() => import("../../containers/AddProjects/Add"));
const UpdateElement = lazy(() =>
  import("../../containers/UpdateProject/UpdateElement")
);
const Home = lazy(() => import("../../containers/Home/Home"));
const Villlas = lazy(() => import("../../containers/Projects/Villlas"));

export const RouterComponent = () => {
  const STH = withAuth(Add);
  // const Projects = withAuth(Update);
  return (
    <Router history={newHistory}>
      <Upperbar />

      <Suspense fallback={<div>Loading... </div>}>
        <Switch>
          {/* <Route exact path={"/"} component={Home} /> */}

          {/* <Route exact path={NonAuthRoutes.home} component={Home} /> */}
          {/* <AuthRoute path={AuthRoutes.home} component={HomePage} /> */}

          {/* <Route path={NonAuthRoutes.about} exact strict componentcomponent={About} /> */}
          {/* <Route path={NonAuthRoutes.login} strict component={LoginPage} /> */}
          <Route
            exact
            strict
            path="/Villas/Elem/:id"
            render={(props) => <Elem {...props} />}
          />
          <Route
            exact
            path={NonAuthRoutes.Villas}
            strict
            // component={Villlas}
            // component={Villlas}
            render={(props) => <Villlas {...props} />}
          />
          {/* <Route
            exact
            path="/About/:type"
            render={(props) => <About {...props} />}
          /> */}

          {/* <Route
            exact
            path={NonAuthRoutes.Elem}
            render={(props) => <Elem {...props} />}
          /> */}
          {/* 
          <Route
            exact
            path="/Update/:type"
            render={(props) => <Projects {...props} />}
          /> */}
          {/* <Route exact path="/Add" render={(props) => <STH />} /> */}

          {/*    <Route path="/Add"  exact strict render={
            () => {
              //return ( <div><h1>Welcome Home</h1>  <Login /></div>);
              return withAuth(Add);
            }
          } />
        */}
          {/* <Route
            path={NonAuthRoutes.Villas}
            render={(props) => <Villlas {...props} />}
          /> */}

          {/* <Route component={NotFound} /> */}
          {/* <Route
            path={NonAuthRoutes.UpdateElement}
            strict
            render={() => {
              //return ( <div><h1>Welcome Home</h1>  <Login /></div>);
              return <UpdateElement />;
            }}
          /> */}
        </Switch>
      </Suspense>
    </Router>
  );
};
