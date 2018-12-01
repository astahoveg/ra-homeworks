const arrayMenu = [
    { name: "Главная", href: "/" },
    { name: "Дрифт-такси", href: "/drift" },
    { name: "Time Attack", href: "/timeattack" },
    { name: "Forza Karting", href: "/forza" }
];

class Menu extends React.Component {
    render() {
        return (
            <nav className="menu">
                {arrayMenu.map(item => <NavLink exact className={"menu__item"} activeClassName={"menu__item-active"} to={item.href}>{item.name}</NavLink>)}
            </nav>
        );
    };
}