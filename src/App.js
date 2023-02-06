import React from 'react'

import "./App.css";

// application routes
import AppRoutes from './routes/AppRoutes'

// api
import ApiContext from './contexts/ApiContext'
import FakeQueryApi from './services/queries/FakeQueriesApi'
import QueryApi from './services/queries/QueriesApi'
import FakeCommandApi from './services/commands/FakeCommandsApi';
import CommandApi from './services/commands/CommandsApi';
import config from './config'

// api initialization
const commandApi = config.useFakeApi ? new FakeCommandApi() : new CommandApi(config.apiUrl)
const queriesApi = config.useFakeApi ? new FakeQueryApi() : new QueryApi(config.apiUrl)
const api = {
  query: queriesApi,
  command: commandApi  
}

// import SomeBankForm from "./components/SomeBankForm";

// function App() {
//   return <div className="App"><SomeBankForm /></div>;
// }

const App = () => (
  <ApiContext.Provider value={api}>
      <AppRoutes />
  </ApiContext.Provider>
)

export default App;
