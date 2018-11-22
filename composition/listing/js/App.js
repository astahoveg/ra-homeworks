'use strict';

const App = ({items}) => (
  <main>
    {items.map(item => <ColorItem item={item} />)}
  </main>
);