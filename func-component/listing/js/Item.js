const Item = function ({ item }) {
    let titleItem;
    let priceItem = `${item.price} ${item.currency_code}`;
    let quantityCount = 'high';

    //Обрезаем title
    titleItem = (item.title.length > 50) ? `${item.title.substr(0, 50)}${String.fromCharCode(8230)}` : item.title;

    //Вывод валюты
    if (item.currency_code == 'USD') {
        priceItem = `${String.fromCharCode(36)}${item.price}`;
    } else if (item.currency_code == 'EUR') {
        priceItem = `${String.fromCharCode(8364)}${item.price}`;
    }

    //Задаем стили для остатка
    if (item.quantity <= 10) {
        quantityCount = 'low';
    } else if (item.quantity <= 20) {
        quantityCount = 'medium';
    }

    return (
        <div className="item">
            <div className="item-image">
                <a href={item.url}>
                    <img src={item.MainImage.url_570xN} />
                </a>
            </div>
            <div className="item-details">
                <p className="item-title">{titleItem}</p>
                <p className="item-price">{priceItem}</p>
                <p className={`item-quantity level-${quantityCount}`}>{`${item.quantity} left`}</p>
            </div>
        </div>
    );
}