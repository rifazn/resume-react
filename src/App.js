import Form from "./components/Form";
import Resume from "./components/Resume";
import { FormToggleButton, SaveAndPrintButton } from "./components/Button";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  return (
    <>
      <header>
        <h1>Resume</h1>
      </header>
      <nav class="navButtons biggerButtons">
        <FormToggleButton />
        <SaveAndPrintButton data={props.data} />
      </nav>
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
