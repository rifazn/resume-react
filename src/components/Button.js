import React from "react";
import { getIcon } from "./FontAwesomeIcons"

export function FormToggleButton() {
  // Setup
  const icons = {
    'expanded': <>{getIcon('angle left')} <span id="visually-hidden">Close Form</span></>,
    'closed'  : <>{getIcon('angle right')} <span id="visually-hidden">Expand Form</span></>
  };
  const [content, setContent] = React.useState(icons.expanded);

  // Handler
  function compressButtonHandler(event) {
    const resume = document.querySelector('output');
    resume.classList.toggle('expanded');
    
    const expanded = event.target.getAttribute("aria-expanded") === "true";
    event.target.setAttribute("aria-expanded", !expanded);

    if (expanded)
      setContent(icons.closed);
    else
      setContent(icons.expanded);
  }

  // render
  return (
    <button type="button" onClick={compressButtonHandler} className="expandBtn" aria-label="Close Form" aria-expanded>
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
    <button type="button" id="saveButton" aria-label="Save and Print" onClick={handler}>
      {getIcon('print')}
    </button>
  );
}

export function AddSectionButton(props) {
  // handler
  function handleClick() {
    const newSection = {
      "title": "New Section",
      "subsections": [{
        "subject": "Noteworthy Venture",
        "organization": "Workplace",
        "description": [""],
        "timeperiod": ""
      }]
    };
    const sections = [...props.data.sections, newSection];
    props.setData({...props.data, sections: sections});
  }

  // render
  return (
    <button type="button" className="addSectionButton" onClick={handleClick}>
      {getIcon('add')} Add Another Section
    </button>
  );
}
