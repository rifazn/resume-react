import React from "react";
import { getIcon } from "./FontAwesomeIcons"

export function FormToggleButton() {
  // Setup
  const icons = {
    'expanded': <><span className="p10">{getIcon('angle left')}</span> Close Form</>,
    'closed'  : <><span className="p10">{getIcon('angle right')}</span> Expand Form</>
  };
  const [content, setContent] = React.useState(icons.expanded);

  // Handler
  function compressButtonHandler(event) {
    const resume = document.querySelector('output');
    resume.classList.toggle('expanded');
    
    const pressed = event.target.getAttribute("aria-pressed") === "true";
    event.target.setAttribute("aria-pressed", !pressed);

    if (pressed)
      setContent(icons.expanded);
    else
      setContent(icons.closed);
  }

  // render
  return (
    <button type="button" onClick={compressButtonHandler} className="expandBtn">
      {content} 
    </button>
  );
}

export function SaveAndPrintButton(props) {
  // handler
  function handler() {
    localStorage.setItem('data', JSON.stringify(props.data));

    window.print();
  }

  // rendered
  return (
    <button type="button" id="saveButton" onClick={handler}>
      <span class="p10">{getIcon('print')}</span>
      Save and Print
    </button>
  );
}
