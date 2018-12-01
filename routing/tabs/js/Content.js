class Content extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        let TabContent;
        if (this.props.component == "creator") {
            TabContent = Creator;
        } else if (this.props.component == "fortune") {
            TabContent = Fortune;
        } else {
            TabContent = Essay;
        }
        return (
            <Route exact path={this.props.href} component={TabContent} />
        );
    };
}
