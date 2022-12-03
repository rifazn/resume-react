import React, { useState } from "react";

export default function Form(props) {
  const [additionalFields, setAdditionalFields] = useState([]);
  
  const contactFields = props.data.contactInfo.map((field) => {
    const [k, v] = Object.entries(field)[0];
    return createInputField(k, v);
  });

  const sectionFields = props.data.sections.map((section) => {
    const subsections = section.subsections.map((subsection) => {
      return (
        <fieldset name="subsections[]">
          <label>Discipline (Degree, Position, Role, etc.)
            <input type="text" name="discipline" value={subsection.title} />
          </label>
          <label>Institute (School, Employer, Project Name, etc.)
            <input type="text" name="institute" value={subsection.subtitle} />
          </label>
          <label>Description
            <textarea
              value={ subsection.description.reduce((string, line) => string + '\n\n' + line)}>
            </textarea>
          </label>
          <label>Timeperiod (Ex: Jun 2015 - Jan 2022)
            <input type="text" name="timeperiod" value={subsection.timeperiod} />
          </label>
        </fieldset>
      );
    });

    return (
      <fieldset name="sections[]">
        <legend>{section.title}</legend>

        <label>Section Name (Ex: Education, Employment, Projects, etc.)
          <input type="text" name="title" />
        </label>

        {subsections}
      </fieldset>
    )
  });

  const contactInfoButtons = [
    "email", "city", "website", "other"
  ].map((type) => {
    return (
      <button type="button" data-type={type}
        onClick={(ev) => contactInfoButtonHandler(ev)}>
        Add {titleCase(type)}
      </button>
    );
  });

  function contactInfoButtonHandler(ev) {
    const btn = ev.target;
    const input = createInputField(btn.dataset.type, '');
    setAdditionalFields([...additionalFields, input]);
  }

  return (
    <form name="resumeForm">
      <label>Your Name
        <input name="name" type="text" value={props.data.name} />
      </label>
      <label>Tagline
        <input name="tagline" type="text" value={props.data.tagline} />
      </label>

      { /* This fieldset can have varying number of input fields */ }
      <fieldset name="contactInfo">
        <legend>Contact Info</legend>
        {contactFields}
        {additionalFields}
        {contactInfoButtons}
      </fieldset>

      { /* There can be multiple fieldsets with name "sections" */ }
      {sectionFields}
    </form>
  );
}

function createInputField(name, value) {
  return (
    <label>{titleCase(name)}
      <input type={getInputType(name)} name={name} value={value} data-iconName={name} />
    </label>
  );

}

function titleCase(text) {
  return text.split(' ').reduce((string, word) => string + word.charAt(0).toUpperCase() + word.slice(1) + ' ', '');
}

function getInputType(key) {
  switch (key) {
    case "description":
      console.error("Please use a <textarea> for description field.")
      return "textarea";
    case "email":
      return "email";
    case "phone":
      return "tel";
    case "website":
      return "url";
    case "decorator":
      return "checkbox";
    case "name":
    case "title":
    case "address":
    case "tagline":
    case "subtitle":
    case "timeperiod":
    case "nationality":
    default:
      return "text";
  }
}
