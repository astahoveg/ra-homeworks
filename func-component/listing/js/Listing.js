const Listing = function({items}) {
    return (
        <div className="item-list">
            {items.map((elem) => <Item key={elem.listing_id} item={elem} />)}
        </div>
    );
}