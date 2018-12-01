const arrayMenu = [
    { id: 1, name: "Главная", href: "/" },
    { id: 2, name: "Дрифт-такси", href: "/drift" },
    { id: 3, name: "Time Attack", href: "/timeattack" },
    { id: 4, name: "Forza Karting", href: "/forza" }
];

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 1
        };
    };

    choiceItemMenu = (itemId) => {
        this.setState({
            active: itemId
        });
    };

    render() {
        return (
            <nav className="menu">
                {arrayMenu.map(item => <Link className={`menu__item${(this.state.active == item.id) ? " menu__item-active" : ""}`}
                    to={item.href}
                    onClick={() => this.choiceItemMenu(item.id)}>
                    {item.name}
                </Link>)}
            </nav>
        );
    };
}