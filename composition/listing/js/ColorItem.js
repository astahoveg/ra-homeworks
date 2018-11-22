'use strict';

const ColorItem = (props) => {
    let colorItem;
    
    switch(props.item.type) {
        case 'unisex':
          colorItem = "black";
          break;
        case 'male':
          colorItem = "blue";
          break;
        case 'female':
          colorItem = "orange";
          break;
    }
    
    return (
      <Item {...props} color={colorItem} />
    );
  };