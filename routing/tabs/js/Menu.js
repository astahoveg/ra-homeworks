class Menu extends React.Component {
    render() {
        return (
            <nav className="tabs__items">
                {data.map(item => <NavLink exact={item.exact} className={"tabs__item"} activeClassName={"tabs__item-active"} to={item.href}>{item.name}</NavLink>)}
            </nav>
        );
    };
}