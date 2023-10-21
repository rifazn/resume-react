export function navBars() {
  return (
    <nav class="navButtons biggerButtons">
      <FormToggleButton />
      <SaveAndPrintButton data={data} />
      <UploadJSONButton  setData={setData} />
    </nav>
  )
}

