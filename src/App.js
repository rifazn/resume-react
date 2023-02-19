import Form from "./components/Form";
import Resume from "./components/Resume";
import { FormToggleButton, SaveAndPrintButton, UploadJSONButton } from "./components/Button";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  return (
    <>
      <nav class="navButtons biggerButtons">
        <FormToggleButton />
        <SaveAndPrintButton data={data} />
        <UploadJSONButton  setData={setData} />
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
