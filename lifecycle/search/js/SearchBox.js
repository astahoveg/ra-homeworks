class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { fixed: false, defaultTop: 0 };
  }

  render() {
    return <SearchBoxView fixed={this.state.fixed} />
  }

  componentDidMount() {
    this.setState({ defaultTop: this.getTopElement() });
    window.addEventListener("scroll", this.setPosition);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.fixed != this.state.fixed);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.setPosition);
  }

  getTopElement() {
    const elem = document.querySelector(".search-box");
    return elem.getBoundingClientRect().top;
  }

  isFixed() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    return ((this.state.defaultTop - scrolled) <= 0);
  }

  setPosition = () => {
    this.setState({
      fixed: this.isFixed()
    });
  }
}