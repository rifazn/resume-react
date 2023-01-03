import { getIcon } from './FontAwesomeIcons'
import '../styles/resume.css'

import { Remarkable } from 'remarkable';

function Resume(props) {
  return (
    <div id="resume">
      <BasicInfo data={props.data} />
      <div id="sections">
        <Sections data={props.data} />
        <SkillBars data={props.data.fancyProgressBars} />
      </div>
    </div>
  );
}

function BasicInfo(props) {
  /* Renders the top portion of the resume that includes the name, tagline,
    * and different contact infos. */
  function Contacts() {
    return (
      props.data.contactInfo.map((contact, i) => {
        const [type, val] = Object.entries(contact)[0];
        if (val)
          return <li key={i}>{getIcon(type)} {val}</li>;
        else
          return <></>;
      })
    );
  }

  return (
    <div id="bio">
      <div>
        <h1>{props.data.name}</h1>
        <p>{props.data.tagline}</p>
        <ul>
          <Contacts />
        </ul>
      </div>

      <div>
        <img src={props.data.photo} alt="profile" />
      </div>

    </div>
  );
}

function Sections(props) {
  /* Renders the rest of the resume. Each "section" includes a title
   * and subsections, which include the subject of the topic (like job role,
    * education degree), name of the organization (a schoold, or place of
    * employment), and a description of the role */
	const md = new Remarkable({breaks: true});

  /* Render the subsections that includes the timeperiods */
  function Subsections(props) {
    return props.subsections.map((subsection) => {
      return (
        <>
          <div className="gutter"></div>
          <Time period={subsection.timeperiod} />
          <h3>{subsection.subject}</h3>
          <div className="gutter"></div>
          <div className="job-description">
            <h4>{subsection.organization}</h4>
            <div dangerouslySetInnerHTML={{__html: md.render(subsection.description.join("\n"))}} />
          </div>
        </>
      );
    });
  }

  /* jdlaskjd */
  function Time(props) {
    return (
      <>
      <div className="time-period">
        <h3>{props.period}</h3>
      </div>
      <div className="decorator">
        <div></div>
      </div>
      </>
    );
  }

  return (
    props.data.sections.map((section) => {
      return (
      <>
        <h2>{section.title}</h2>
        <Subsections subsections={section.subsections} />
      </>
      );
    })
  );
}

function SkillBars(props) {
  const skills = props.data.map((skill, index) => {
    const header = (
      <>
        <h2 key={index}>{skill.skillName}</h2>
        <div className="gutter" key={"gutter" + index}></div>
      </>
    );
    const skills = skill.bars.map((bar, index) => {
      let [k,v] = Object.entries(bar)[0];
      let [v1, v2] = v.split('/'); // v is like 4/5, etc
      v = v1/v2; // get a float value

      return (
        <div className="skill">
          <p>{k}</p>
          <div className="skill-level">
            <span style={{width: v*100 + "%"}}></span>
          </div>
        </div>
      );
    });

    return (
      <>
        {header}
        <div className="skills">
          {skills}
        </div>
      </>
    );
  });

  return (
    <>
      {skills}
    </>
  );
}

export default Resume;
