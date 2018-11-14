'use strict';

function Stars({count}) {
  let arrayStars = [];

  if ((typeof count != "number") || (count < 1) || (count > 5)) {
    return null;
  }

  for (let i = 0; i < count; i++) {
    arrayStars.push(i + 1);
  }

  const StarList = arrayStars.map((item) => <li key={item}><Star /></li>);
  return (
    <ul className="card-body-stars u-clearfix">{StarList}</ul>
  );
}
