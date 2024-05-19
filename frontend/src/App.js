// App.js
import React, { useEffect } from 'react';
import '@passageidentity/passage-elements/passage-auth';
import { useHistory } from 'react-router-dom';


function App() {
  const history = useHistory();

  useEffect(() => {
    const passageAuth = document.querySelector('passage-auth');

    const handleSignedIn = () => {
      // Redirect to the profile page upon successful sign-in
      history.push('/profile');
    };

    passageAuth.addEventListener('signed-in', handleSignedIn);

    return () => {
      passageAuth.removeEventListener('signed-in', handleSignedIn);
    };
  }, [history]);

  return (
    <div className="App">
      <passage-auth></passage-auth>
    </div>
  );
}

export default App;



