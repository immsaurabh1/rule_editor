import React from 'react';
import './App.css';
import RulesComponent from './components/Route/RulesComponent'
import AddRuleComponent from './components/Route/AddRuleComponent'
import styled from 'styled-components'
import Box from "@material-ui/core/Box"
import { Switch, Route, Link } from "react-router-dom"

const CustomBox = styled(Box)`
    margin: 16px;
    border: 1px solid #dcdcdc;
    padding: 16px;
    border-radius: 2px;
    overflow-y:auto;
    overflow-x:hidden;
    @media (max-width: 600px) {
        margin: 8px;
        padding: 8px;
    }`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link
          to="/"
          style={{ textDecoration: "none", color: '#ffffff' }}>
          <span>Casaone</span>
        </Link>
      </header>
      <div className="App-body">
        <CustomBox>
          <Switch>
            <Route
              exact
              path={["/"]}
              render={renderProps => (
                <RulesComponent />
              )}
            />
            <Route
              exact
              path={["/rules/add"]}
              render={renderProps => (
                <AddRuleComponent {...renderProps} />
              )}
            />
            <Route
              exact
              path={["/rules/edit"]}
              render={renderProps => (
                <AddRuleComponent {...renderProps} />
              )}
            />
          </Switch>
        </CustomBox>
      </div>
    </div>
  );
}

export default App;
