import React from 'react';
import HomeComponent from './HomeComponent';

function App() {
  return (
    <div className="App">
      <HomeComponent></HomeComponent>
      </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [data, setData] = useState('');

//   useEffect(() => {
//     (async function () {
//       const { text } = await( await fetch(`/api/message`)).json();
//       setData(text);
//     })();
//   });

//   return <div>{data}</div>;
// }

// export default App;