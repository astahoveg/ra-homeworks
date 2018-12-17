class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { map: null };
  }

  componentDidMount() {
    this.setState({
      map: new google.maps.Map(document.getElementById('map'))
    });
  }

  componentDidUpdate() {
    this.state.map.setZoom(5);
    this.props.points.forEach(p => new google.maps.Marker({
      map: this.state.map,
      position: p,
      visible: true
    }));
    this.state.map.setCenter({ lng: 0, lat: 0 });
  }

  componentWillUnmount() {
    this.map.destroy();
  }

  render() {
    return (
      <div id='mapParent'>
        Карта
        <div id='map'></div>
      </div>
    );
  }
}
