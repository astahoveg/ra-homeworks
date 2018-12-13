class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
    };
  }

  componentWillMount() {
    this.setState({ points: this.props.points });
  };
  
  render() {
    console.log("render", this.props, this.props.points, this.state);
    return (
      <div id="map" />
    );
  }

  componentDidMount() {
    console.log("componentDidMount", this.props, this.props.points, this.state);
	  const map = new google.maps.Map(document.getElementById("map"));
  }
}
