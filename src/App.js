import Form from "./components/Form";
import Resume from "./components/Resume";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  return (
    <>
      <header>React Resume</header>
      <div className="App">
        <Form data={data} setData={setData} />
        <output htmlFor="resumeForm">
          <Resume data={data} />
        </output>
      </div>
    </>
  );
}



export default App;
