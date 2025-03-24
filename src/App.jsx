import React from 'react';
import { useState  } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import QuestionForm from './components/QuestionForm';

function App() {
  const [formData, setFormData]= useState(null);
  
  return (
    <div>
      <h1>Welcome to the Dive Bar Trivia Challenge!</h1>
      <h2>Let's Test your knowledge!</h2>
      <UserForm onFormSubmit={setFormData} />
      {formData && <QuestionForm formData={formData} />}
    </div>
  )
}

export default App
