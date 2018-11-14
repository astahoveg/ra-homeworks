'use strict';

function show(items) {
    ReactDOM.render(
        <Listing items={items} />,
        document.getElementById("root")
    );
}

function init() {
    fetch('https://neto-api.herokuapp.com/etsy')
        .then((response) => response.json())
        .then(show);
}

document.addEventListener("DOMContentLoaded", init);