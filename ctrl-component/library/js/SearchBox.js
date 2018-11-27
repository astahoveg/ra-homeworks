class SearchBox extends React.Component {
    constructor(props) {
        super(props);
    };

    onChange = (event) => {
        this.props.filterBooks(event.target.value);
    };

    render() {
        return (
            <input type="text" placeholder="Поиск по названию или автору" defaultValue={this.props.value} onChange={this.onChange} />
        );
    };
};