class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      completed: 0
    };
  };

  showProgressBar(canvas, ctx) {
    const paramShow = [{
        type: "arc",
        borderColor: "#4ca89a",
        radius: 52,
        endAngle: Math.PI * 2
      },
      {
        type: "arc",
        borderColor: "#96d6f4",
        radius: 45,
        endAngle: Math.PI * 2 * this.state.completed / this.state.total
      },
      {
        type: "text",
        text: `${Math.round((this.state.completed/this.state.total)*100)}%`
      }
    ];
    const lineWidth = 7;
    const startAngle = 0;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;

    paramShow.forEach((elem) => {
      if (elem.type == "arc") {
        ctx.beginPath();
        ctx.strokeStyle = elem.borderColor;
        ctx.arc(x, y, elem.radius, startAngle, elem.endAngle);
        ctx.stroke();
        ctx.closePath();
      } else if (elem.type == "text") {
        ctx.beginPath();
        ctx.font = "1.5em sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(elem.text, x, y, canvas.width);
        ctx.closePath();
      }
    });
  };

  updateProgressBar = () => {
    const canvas = document.getElementById('progressCanvas');
    const ctx = canvas.getContext('2d');
    const box = document.querySelector(".progress-container");

    canvas.width = box.clientWidth;
    canvas.height = box.clientHeight;

    this.showProgressBar(canvas, ctx);
  };

  componentWillMount() {
    this.setState({
      completed: this.props.completed,
      total: this.props.total
    });
  };

  render() {
    return (
      <canvas id = "progressCanvas" className = "progress" / >
    );
  };

  componentDidMount() {
    this.updateProgressBar();
    window.addEventListener("resize", this.updateProgressBar);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      completed: nextProps.completed,
      total: nextProps.total
    });
  };

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps) == JSON.stringify(this.props)) return false;
    return true;
  };

  componentDidUpdate() {
    this.updateProgressBar();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateProgressBar);
  };
}