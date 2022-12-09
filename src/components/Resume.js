import { getIcon } from './FontAwesomeIcons'

function Resume(props) {
  return (
    <BasicInfo data={props.data} />
  );
}

function BasicInfo(props) {
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

export default Resume;
