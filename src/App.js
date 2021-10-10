import './App.css';
import { Switch, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import { CreateExercise } from './Pages/CreateExercise';
import { Navbar } from './Components/Navbar';
import { EditExercise } from './Pages/EditExercise';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/create-exercise" exact>
          <CreateExercise />
        </Route>
        <Route path="/exercises/:id/edit" exact>
          <EditExercise />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
