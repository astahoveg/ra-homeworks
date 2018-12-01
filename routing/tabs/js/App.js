class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="tabs">
                    <Menu />
                    <div className="tabs__content">
                        {data.map(item => <Content {...item} />)}
                    </div>
                </div>
            </Router>
        );
    }
}
