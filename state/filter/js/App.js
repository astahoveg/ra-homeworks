'use strict'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: "All"
    };
  }

  selectFilter = (newFilter) => {
    this.setState({
      isSelected: newFilter
    });
  }

  filterProject = (item) => {
    if (this.state.isSelected != "All") {
      return item.category == this.state.isSelected;
    }
    return true;
  }

  render() {
    return (
      <div>
        <Toolbar
          filters={this.props.filters}
          selected={this.state.isSelected}
          onSelectFilter={this.selectFilter} />
        <Portfolio projects={this.props.projects.filter(this.filterProject)} />
      </div>
    );
  }
}
