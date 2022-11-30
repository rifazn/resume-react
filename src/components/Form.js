import React from "react";

export default function Form(props) {
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
        <label>Email
          <input name="email" type="email" data-icon="email" />
        </label>
        <label>Phone
          <input name="phone" type="tel" data-icon="phone" />
        </label>
        <label>Address
          <input name="address" type="text" data-icon="address" />
        </label>
        <label>Nationality
          <input name="nationality" type="text" data-icon="nationality" />
        </label>
        <label>URL
          <input name="website" type="url" data-icon="website" />
        </label>
      </fieldset>
      { /* There can be multiple fieldsets with name "sections" */ }
      <fieldset name="sections[]">
        <legend>{props.data.sections[0].title}</legend>
        <label>Section Name (Ex: Education, Employment, Projects, etc.)
          <input type="text" name="title" />
        </label>

        <fieldset name="subsections[]">
          <label>Discipline (Degree, Position, Role, etc.)
            <input type="text" name="discipline" />
          </label>
          <label>Institute (School, Employer, Project Name, etc.)
            <input type="text" name="institute" />
          </label>
          <label>Description
            <input type="text" name="description" />
          </label>
          <label>Timeperiod (Ex: Jun 2015 - Jan 2022)
            <input type="text" name="timeperiod" />
          </label>
        </fieldset>

      </fieldset>
    </form>
  );
}
