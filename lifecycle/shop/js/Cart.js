class Cart extends React.Component {

  render() {
    return (
      <CartView {...this.props} />
    );
  }

  shouldComponentUpdate(nextProps) {
    const { items, isOpen } = nextProps;
    if ((isOpen != this.props.isOpen) || (isOpen && (items.length != this.props.items.length))) return true;
    return false;
  }

}