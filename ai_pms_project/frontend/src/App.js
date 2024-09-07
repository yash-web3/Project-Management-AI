import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import TaskBoard from './pages/TaskBoard';
import AIInsights from './pages/AIInsights';
import Navbar from './components/Navbar';
import AIPopup from './components/AIPopup';
import './styles/main.css';

function App() {
  const [showAIPopup, setShowAIPopup] = useState(false);
  const projects = ['Project A', 'Project B', 'Project C']; // Example project list

  return (
    <div className="App">
      <Navbar onAIClick={() => setShowAIPopup(true)} />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/projects" component={ProjectList} />
          <Route path="/tasks" component={TaskBoard} />
          <Route path="/ai-insights" component={AIInsights} />
        </Switch>
      </div>
      {showAIPopup && (
        <AIPopup 
          onClose={() => setShowAIPopup(false)}
          projects={projects}
        />
      )}
    </div>
  );
}

export default App;