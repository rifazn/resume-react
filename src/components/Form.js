import React from "react";
import { FormToggleButton, AddSectionButton } from './Button';
import { getIcon } from "./FontAwesomeIcons";

export default function Form(props) {
  /* Generates the fields: email, address, website, etc... This variable and
    * the next could be made into a component, but is okay this way too I think. */
  const contactFields = props.data.contactInfo.map((field, index) => {
    const [k, v] = Object.entries(field)[0];
    return createInputField(k, v, index);
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

  /* Generates all the firelds in a section along with a fieldset */
  const sectionFields = props.data.sections.map((section, index) => {
    const subsections = section.subsections.map((subsection, idx) => {
      return (
        <details>

          <summary>
            {subsection.subject}{subsection.organization? " - " + subsection.organization : ""}
          </summary>
          
          <fieldset name="subsections[]" className="my-1rem">
            <label>Discipline
              <p className="inputHint">(Degree, Position, Role, etc.)</p>
              <input type="text" name="subject" className="d-block" size="20" value={subsection.subject} data-index={idx} />
            </label>

            <label>Institute
              <p className="inputHint">(School, Employer, Project Name, etc.)</p>
              <input type="text" name="organization" className="d-block" size="20" value={subsection.organization} data-index={idx} />
            </label>

            <label>Description
              <textarea rows="8" cols="50" data-index={idx} name="description"
                value={ subsection.description.reduce((string, line) => string + '\n' + line)}>
              </textarea>
            </label>

            <label>Timeperiod
              <p className="inputHint">(Ex: Jun 2015 - Jan 2022)</p>
              <input type="text" name="timeperiod" className="d-block" size="20" value={subsection.timeperiod} data-index={idx} />
            </label>

            <button type="button" onClick={removeButtonHandler} data-index={[index,idx]}>
              {getIcon('remove')}  Remove
            </button>
          </fieldset>
        </details>
      );
    });

    return (
      <fieldset name="sections[]" classNames="my-2rem" key={index} onChange={(ev) => sectionHandler(ev, index)}>
        <legend>{section.title}</legend>

        <label>Section Name
          <small className="inputHint">(Ex: Education, Employment, Projects, etc.)</small>
          <input type="text" name="title" className="d-block" value={section.title} />
        </label>

        {subsections}

        <button type="button" onClick={(ev) => sectionRemoveHandler(ev, index)}>
          <span style={{color: "red"}}>{getIcon('remove')}</span> Remove Section </button>
      </fieldset>
    )
  });

  const fancyProgressBars = props.data.fancyProgressBars.map((fpb, index) => {
    const inputfields = fpb.bars.map((bar, index) => {
      const [k, v] = Object.entries(bar)[0];
      // values are in the form value/max
      const [val, max] = v.split("/");
      return (
        <>
            <input type="text" name="skillItem" className="d-block" value={k} data-index={index} key={index} />
            <input type="range" value={val} max={max} min="1" step="1" name={k} data-index={index} key={k} />
        </>
      );
    });
    return (
      <fieldset name="skills[]" onChange={(ev) => handleSkillBars(ev, index)}>
        <legend>Skill</legend>
          <input type="text" name="skillName" className="d-block" value={fpb.skillName} />
        <fieldset>
		  <legend>Confidence Level</legend>
          {inputfields}
		  <button data-skillname={fpb.skillName} type="button" onClick={(ev) => addToSkillTypeButtonHandler(ev, index)}>
			Add Another
		  </button>
        </fieldset>
      </fieldset>
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
    const id = parseInt(event.target.dataset.id);
    const newContactInfo = props.data.contactInfo.map((contact, index) => {
      if (index === id) return {[name]: val};
      return contact;
    });
    props.setData({...props.data, contactInfo: newContactInfo});
  }

  function handleSkillBars(event, skillIndex) {
    const name = event.target.name;
    const value = event.target.value;

    const updated = props.data.fancyProgressBars.map((fpb, index) => {
      if (index !== skillIndex)
        return fpb;

      if (name === "skillName") {
        return {...fpb, skillName: value};
      }

      const bars = fpb.bars.map((bar, index) => {
        const idx = parseInt(event.target.dataset.index);
        const v = Object.values(bar)[0];

        if (idx !== index)
          return bar;
        if (name === "skillItem")
          return {[value]: v};

        return {[name]: `${value}/5`};
      });
      return {...fpb, "bars": bars};
    });
    props.setData({...props.data, fancyProgressBars: updated});
  }

/* Button Handlers ------------------------------------------- */
  function addToSkillTypeButtonHandler(event, skillIndex) {
    const fpb = props.data.fancyProgressBars.map((fpb, index) => {
      if (index === skillIndex) {
        const bars = [...fpb.bars, {'New Language': '5/5'}];
        return {...fpb, bars: bars};
      }
      return fpb;
    });
    props.setData({...props.data, fancyProgressBars: fpb});
  }

  function addSkillButtonHandler(event) {
    const newBar = {
      "skillName": "Clicking Buttons",
      "bars": [{"Precision": "4/5"}, {"Conviction": "5/5"}]
    }
    const onemore = [...props.data.fancyProgressBars, newBar];
    props.setData({...props.data, fancyProgressBars: onemore});
  }

  function removeButtonHandler(event) {
    const [section, subsection] = event.target.dataset.index.split(',');
    const updated = props.data.sections.map((sec, idx) => {
      const index = parseInt(section);
      if (idx !== index)
        return sec;

      const updatedSubs = sec.subsections.filter((sub, idx) => {
        const index = parseInt(subsection);
        console.log(`Jeta paisi: ${index}`);
        if (idx !== index)
          return sub;
      });

      return {...sec, subsections: updatedSubs};
    });

    props.setData({...props.data, sections: updated});
  }

  function sectionRemoveHandler(ev, index) {
    const updated = props.data.sections.filter((sec, idx) => idx !== parseInt(index));
    props.setData({...props.data, sections: updated});
  }

/* Main render function */
  return (
    <form name="resumeForm" className="resumeForm">
      <fieldset name="basicInfo" onChange={handleBasicInfo}>
        <legend>Basic Info</legend>
        <label>Your Name
          <input name="name" className="d-block" type="text" value={props.data.name} />
        </label>
        <label>Tagline
          <input name="tagline" className="d-block" type="text" value={props.data.tagline} />
        </label>
        <label>Photo URL
          <input name="photo" className="d-block" type="url" value={props.data.photo} />
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
      <AddSectionButton data={props.data} setData={props.setData} />

      { /* "FancyProgressBars": these render as bars in resume */ }
	  {fancyProgressBars}
      <button type="button" onClick={addSkillButtonHandler}>Add another skill</button>
    </form>
  );
}



/* Other helper functions */

function createInputField(name, value, index) {
  return (
    <>
      <label key={"l" + index} className="d-block" for={"cf" + name + index}>
        {titleCase(name)}
      </label>
      <input type={getInputType(name)} name={name} key={"i" + index} value={value} data-iconName={name} data-id={index} id={"cf" + name + index} />
      <button type="button" className="contactRemoveButton" key={"b" + index}>
        {getIcon('remove')}
      </button>
    </>
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

