'use strict';

const VIEW_LIST = "view_list";
const VIEW_MODULE = "view_module";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: VIEW_MODULE
    };
  }
  
  switchViewType = (event) => {
    this.setState({
      viewType: (this.state.viewType == VIEW_MODULE)?VIEW_LIST:VIEW_MODULE
    });
  }
  
  render() {
    return (
      <div>
        <div className="toolbar">
          <IconSwitch
            icon={this.state.viewType}
            onSwitch={this.switchViewType} />
        </div>
        {this.renderLayout((this.state.viewType == VIEW_MODULE))}
      </div>
    );
  }

  renderLayout(cardView) {
    if (cardView) {
      return (
        <CardsView
          layout={this.props.layout}
          cards={this.getShopItems(this.props.products, cardView)} />
      );
    }
    return (<ListView items={this.getShopItems(this.props.products, cardView)} />);
  }

  getShopItems(products, cardView) {
    return products.map(product => {
      let cardProps = {
        title: product.name,
        caption: product.color,
        img: product.img,
        price: `$${product.price}`
      };
      if (cardView) {
        return (
          <ShopCard {...cardProps}/>
        );
      }
      return (<ShopItem {...cardProps}/>)
    });
  }
}