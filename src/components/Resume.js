import { getIcon } from './FontAwesomeIcons'
import '../styles/resume.css'

function Resume(props) {
  return (
    <div id="resume">
      <BasicInfo data={props.data} />
      <div id="sections">
        <Sections data={props.data} />
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
        return <li key={i}>{getIcon(type)} {val}</li>
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
        <img src="photo-passport.png" alt="profile photo" />
      </div>

    </div>
  );
}

function Sections(props) {
  /* Renders the rest of the resume. Each "section" includes a title
   * and subsections, which include the subject of the topic (like job role,
    * education degree), name of the organization (a schoold, or place of
    * employment), and a description of the role */

  /* Render the subsections that includes the timeperiods */
  function Subsections(props) {
    const subsections = props.subsections;
    return props.subsections.map((subsection) => {
      return (
        <>
          <div class="gutter"></div>
          <Time period={subsection.timeperiod} />
          <h3>{subsection.subject}</h3>
          <div class="gutter"></div>
          <div class="job-description">
            <h4>{subsection.organization}</h4>
            <p>
              <em>CGPA: 3.2</em><br /><br />
            </p>
            <p><strong>Currently writing a conference paper on my finished capstone project that aims to allow disabled people to browse the Internet more effortlessly.</strong></p>
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
        <div>
        </div>
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

export default Resume;
