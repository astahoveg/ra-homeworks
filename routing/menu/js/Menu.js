const arrayMenu = [
	{ name: "Главная", href: "/", exact: true },
	{ name: "Дрифт-такси", href: "/drift", exact: true },
	{ name: "Time Attack", href: "/timeattack", exact: true },
	{ name: "Forza Karting", href: "/forza", exact: true }
];

class Menu extends React.Component {
	render() {
		return (
			<nav className="menu">
				{arrayMenu.map(item => <NavLink exact={item.exact} className={"menu__item"} activeClassName={"menu__item-active"} to={item.href}>{item.name}</NavLink>)}
			</nav>
		);
	};
}