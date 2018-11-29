'use strict';

const profileStyle = {
  border: '1px solid #cccccc',
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  margin: '5px'
};

const imageStyle = {
  width: '200px',
  height: '200px'
};

const isCorrectDate = (date) => {
  let currentDate = new Date();
  let arrayDate = date.split("-");
  currentDate.setHours(0, 0, 0, 0);
  return (currentDate > new Date(arrayDate[0], arrayDate[1] - 1, arrayDate[2]));
}

const urlPropType = (props, propName, componentName) => {
  let url = props[propName];
  let isUrl = (typeof url === 'string') && /^https:\/\/vk.com\/(id[0-9]+|[A-Za-z0-9_-]+)$/.test(url);

  if (!isUrl) {
    return new Error(`Invalid prop ${propName} supplied to
    ${componentName}. Expecting something like https://vk.com/.... Validation failed`);
  }
  return null;
}

const datePropType = (props, propName, componentName) => {
  let date = props[propName];
  let isDate = (typeof date === 'string') && /^[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])$/.test(date) && isCorrectDate(date);

  if (!isDate) {
    return new Error(`Invalid prop ${propName} supplied to
    ${componentName}. Expecting something like 'YYYY-MM-DD' and value must be less than the current date. Validation failed`);
  }
  return null;
}

const createChainableTypeChecker = (validate) => {
  const checkType = (isRequired, props, propName, componentName) => {
    if (props[propName] === null) {
      if (isRequired) {
        return new Error(`The prop ${propName}
         is marked as required in ${componentName}, but its value is \`${props[propName]}\``);
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

const Profile = props => {
  return (
    <div className="col-md-4 text-center" style={{ marginBottom: '10px' }}>
      <div style={profileStyle}>
        <h2>{props.first_name} {props.last_name}</h2>
        <div>
          <img src={props.img} className="img-thumbnail" style={imageStyle} />
        </div>
        <p>vk: <a href={props.url}>{props.url}</a></p>
        <p>birthday: <a href={props.birthday}>{props.birthday}</a></p>
      </div>
    </div>
  );
};

Profile.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  img: PropTypes.string,
  url: createChainableTypeChecker(urlPropType).isRequired,
  birthday: createChainableTypeChecker(datePropType).isRequired
};

Profile.defaultProps = {
  img: "./images/profile.jpg"
};