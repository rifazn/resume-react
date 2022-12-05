import Form from "./components/Form";
import { useState } from 'react';

function App(props) {
  const [data, setData] = useState(props.data);
  console.log(data);
  return (
    <div className="App">
      <header>React Resume</header>
      <p>Hello, world!</p>
      <Form data={data} setData={setData} />
    </div>
  );
}



export default App;
