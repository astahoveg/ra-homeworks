'use strict';

const getDefaultDate = () => {
  const newDate = new Date();
  let year = newDate.getFullYear();
  let mounth = newDate.getMonth() + 1;
  let date = newDate.getDate();

  if (mounth.toString().length == 1) mounth = `0${mounth}`;
  if (date.toString().length == 1) date = `0${date}`;

  return `${year}-${mounth}-${date}`;
}

const DateInput = props => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input type="text" className="form-control" name={props.name} onChange={props.onChange}
        value={props.value} required={props.required} placeholder="YYYY-MM-DD" />
    </div>
  )
};

DateInput.propTypes = {
  onChange: PropTypes.func,

  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

DateInput.defaultProps = {
  value: getDefaultDate()
};