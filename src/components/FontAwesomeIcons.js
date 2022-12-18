import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faGlobe, faFlag, faHome, faAngleRight, faCalendarDays, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

// Icon instances mapped by "type" of field
export function getIcon(type) {
  switch(type) {
    case "email":
      return <FontAwesomeIcon icon={faEnvelope} />;
    case "phone":
      return <FontAwesomeIcon icon={faPhone} />;
    case "website":
      return <FontAwesomeIcon icon={faGlobe} />;
    case "nationality":
      return <FontAwesomeIcon icon={faFlag} />;
    case "address":
      return <FontAwesomeIcon icon={faHome} />;
    case "date of birth":
      return <FontAwesomeIcon icon={faCalendarDays} />;
    case "angle left":
      return <FontAwesomeIcon icon={faAngleLeft} />;
    case "angle right":
    default:
      return <FontAwesomeIcon icon={faAngleRight} />;
  }
}
