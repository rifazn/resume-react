import Form from "./components/Form";
import Resume from "./components/Resume";
import { FormToggleButton, SaveAndPrintButton } from "./components/Button";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  return (
    <>
      <nav class="navButtons biggerButtons">
        <FormToggleButton />
        <SaveAndPrintButton data={data} />
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
