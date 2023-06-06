import './App.css';
import * as React from 'react';
import Router from './components/Router';

export interface IAppProps {

}

class App extends React.Component<IAppProps> {
  public render() {
    return (
      <Router />
    );
  }
}

export default App;
