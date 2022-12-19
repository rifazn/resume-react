import Form from "./components/Form";
import Resume from "./components/Resume";
import { FormToggleButton } from "./components/Button";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  return (
    <>
      <header>
        <h1>Resume</h1>
        <FormToggleButton />
      </header>
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
