import { FormToggleButton, SaveAndPrintButton, UploadJSONButton } from "./Button";

export function NavBars(data, setData) {
  return (
    <nav class="navButtons biggerButtons">
      <FormToggleButton />
      <SaveAndPrintButton data={data} />
      <UploadJSONButton  setData={setData} />
    </nav>
  )
}

