'use strict';

const data = [
    { head: "Компоненты", text: "Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой." },
    { head: "Выучил раз, используй везде!", text: "После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native." },
    { head: "Использование JSX", text: "JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода." }
];

class AccordionSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className={`section ${(this.props.isOpen) ? "open" : null}`} onClick={this.props.onClick}>
                <button>toggle</button>
                <h3 className="sectionhead">{this.props.data.head}</h3>
                <div className="articlewrap">
                    <div className="article">{this.props.data.text}</div>
                </div>
            </section>
        );
    };
}

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: null
        };
    };

    onClick = (index) => {
        this.setState({
            isOpen: index
        });
    };

    render() {
        return (
            <main className="main">
                <h2 className="title">{this.props.title}</h2>
                {this.props.data.map((item, index) => <AccordionSection key={index} data={item} isOpen={(index == this.state.isOpen)} onClick={() => this.onClick(index)} />)}
            </main>
        );
    };
}

ReactDOM.render(
    <Accordion title="React" data={data} />, document.getElementById('accordian')
);