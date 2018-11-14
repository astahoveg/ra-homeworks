const Menu = function ({items, opened}) {
    const item_list = items.map((item) => <li><a href={item.href}>{item.title}</a></li>);
    const navigation = (
        <nav>
            <ul>{item_list}</ul>
        </nav>
    );

    return (
        <div className={(opened) ? "menu menu-open" : "menu"}>
            <div className="menu-toggle">
                <span />
            </div>
            {(opened) ? navigation : null}
        </div>
    );
}