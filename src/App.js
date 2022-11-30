import Form from "./components/Form"

function App(props) {
  console.log(props.data);
  return (
    <div className="App">
      <header>React Resume</header>
      <p>Hello, world!</p>
      <Form data={props.data} />
    </div>
  );
}



export default App;
