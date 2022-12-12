import React from "react";
import { getIcon } from "./FontAwesomeIcons"

export default function Form(props) {
  /* Generates the fields: email, address, website, etc... This variable and
    * the next could be made into a component, but is okay this way too I think. */
  const contactFields = props.data.contactInfo.map((field, index) => {
    const [k, v] = Object.entries(field)[0];
    return createInputField(k, v, index);
  });

  /* Generates all the firelds in a section along with a fieldset */
  const sectionFields = props.data.sections.map((section, index) => {
    const subsections = section.subsections.map((subsection, idx) => {
      return (
        <fieldset name="subsections[]" classNames="my-1rem">
          <label>Discipline (Degree, Position, Role, etc.)
            <input type="text" name="subject" size="20" value={subsection.subject} data-index={idx} />
          </label>
          <label>Institute (School, Employer, Project Name, etc.)
            <input type="text" name="organization" size="20" value={subsection.organization} data-index={idx} />
          </label>
          <label>Description
            <textarea rows="8" cols="50" data-index={idx} name="description"
              value={ subsection.description.reduce((string, line) => string + '\n' + line)}>
            </textarea>
          </label>
          <label>Timeperiod (Ex: Jun 2015 - Jan 2022)
            <input type="text" name="timeperiod" size="20" value={subsection.timeperiod} data-index={idx} />
          </label>
        </fieldset>
      );
    });

    return (
      <fieldset name="sections[]" classNames="my-2rem" key={index} onChange={(ev) => sectionHandler(ev, index)}>
        <legend>{section.title}</legend>

        <label>Section Name (Ex: Education, Employment, Projects, etc.)
          <input type="text" name="title" value={section.title} />
        </label>

        {subsections}
      </fieldset>
    )
  });

  const fancyProgressBars = props.data.fancyProgressBars.map((fpb, index) => {
    const inputfields = fpb.bars.map((bar, index) => {
      const [k, v] = Object.entries(bar)[0];
      // values are in the form value/max
      const [val, max] = v.split("/");
      return (
        <label>{k}
          <input type="range" value={val} max={max} min="1" step="1" name={k} key={k} />
        </label>
      );
    });
    return (
      <fieldset name="skills[]" onChange={(ev) => handleSkillBars(ev, index)}>
        <legend>{fpb.skillName}</legend>
        <label>Skill Name
          <input type="text" name="skillName" value={fpb.skillName} />
        </label>
        {inputfields}
      </fieldset>
    );
  });

  const contactInfoButtons = [
    "email", "address", "website", "date of birth", "other"
  ].map((type) => {
    return (
      <button type="button" data-type={type}
        onClick={(ev) => contactInfoButtonHandler(ev)}>
        {getIcon(type)} Add {titleCase(type)}
      </button>
    );
  });


  /* Event handlers --------------------------------------- */

  function contactInfoButtonHandler(ev) {
    const btn = ev.target;
    // const input = createInputField(btn.dataset.type, '', props.data.contactInfo.length);
    // setAdditionalFields([...additionalFields, input]);
    const newFields = [...props.data.contactInfo, {[btn.dataset.type]: ''}];
    props.setData({...props.data, contactInfo: newFields});
  }

  function handleBasicInfo(event) {
    const val = event.target.value;
    props.setData({...props.data, [event.target.name]: val});
  }

  function sectionHandler(event, sectionIndex) {
    const index = parseInt(event.target.dataset.index);
    const name = event.target.name;
    let value = event.target.value;

    // "title" is not inside any subsections. Return early
    if (name === "title") {
      console.log("editing title")
      const sections = props.data.sections.map((section, idx) => {
        if (idx === parseInt(sectionIndex))
          return {...section, [name]: value};
        return section;
      });
      props.setData({...props.data, "sections": sections})
      return;
    }

    // "description" is multiline so needs to be broken into a list
    // before adding it to json data
    if (name === "description") value = value.split("\n")

    // First edit the subsection in which update happened
    const subsections = props.data.sections[sectionIndex].subsections.map((ss, i) => {
      if (i === index)
        return {...ss, [name]: value};
      return ss;
    });

    // add the subsection to the respective section
    const sections = props.data.sections.map((s, i) => {
      if (i === parseInt(sectionIndex)) {
        return {...s, "subsections": subsections}
      }
      return s;
    });

    props.setData({...props.data, "sections": sections})
  }

  function handleContactInfo(event) {
    const val = event.target.value;
    const name = event.target.name;
    const id = parseInt(event.target.id);
    const newContactInfo = props.data.contactInfo.map((contact, index) => {
      if (index === id) return {[name]: val};
      return contact;
    });
    props.setData({...props.data, contactInfo: newContactInfo});
  }

  function handleSkillBars(event, skillIndex) {
    console.log(`SkillBar input name: ${event.target.name}.\tValue: ${event.target.value}`);
    skillIndex = 0;
    const name = event.target.name;
    const value = event.target.value;

    if (name === "skillName") {
      const updated = props.data.fancyProgressBars.map((fpb, index) => {
        if (index === skillIndex) {
          return {...fpb, skillName: value};
        }
        return fpb;
      })
      props.setData({...props.data, fancyProgressBars: updated});
    } else {
      const fpb = props.data.fancyProgressBars.map((fpb, index) => {
        if (index === skillIndex) {
          const bars = fpb.bars.map((bar, index) => {
            const k = Object.keys(bar)[0];
            if (k === name) {
              return {[name]: `${value}/5`};
            }
            return bar;
          });
          return {...fpb, "bars": bars};
        }
        return fpb;
      });
      props.setData({...props.data, fancyProgressBars: fpb});
    }
  }

  return (
    <form name="resumeForm">
      <fieldset name="basicInfo" onChange={handleBasicInfo}>
        <legend>Basic Info</legend>
        <label>Your Name
          <input name="name" type="text" value={props.data.name} />
        </label>
        <label>Tagline
          <input name="tagline" type="text" value={props.data.tagline} />
        </label>
      </fieldset>

      { /* This fieldset can have varying number of input fields */ }
      <fieldset name="contactInfo" classNames="my-2rem" onChange={handleContactInfo}>
        <legend>Contact Info</legend>
        {contactFields}
        {contactInfoButtons}
      </fieldset>

      { /* There can be multiple fieldsets with name "sections" */ }
      {sectionFields}

      { /* "FancyProgressBars": these render as bars in resume */ }
      <fieldset name="fancyProgressBars">
        <legend>Skill</legend>
        {/*<FancyProgressBars />*/}
        {fancyProgressBars}
      </fieldset>
    </form>
  );
}



/* Other helper functions */

function createInputField(name, value, index) {
  return (
    <label key={index}>{titleCase(name)}
      <input type={getInputType(name)} name={name} id={index} value={value} data-iconName={name} />
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

