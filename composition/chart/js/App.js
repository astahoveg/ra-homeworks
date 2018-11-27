function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
	return a - b;
}

class LegendGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Legend">
				{this.props.labels.map((label, labelIndex) => <LegendItem color={this.props.colors[labelIndex % this.props.colors.length]} label={label} />)}
			</div>
		);
	}
}

class LegendItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<span className="Legend--color" style={{ backgroundColor: this.props.color }} />
				<span className="Legend--label">{this.props.label}</span>
			</div>
		);
	}
}

class ChartItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`Charts--item ${this.props.className}`} style={this.props.style} key={this.props.itemIndex}>
				<b style={{ color: this.props.color }}>{this.props.item}</b>
			</div>
		);
	}
}

class Chart extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`Charts--serie ${this.props.className}`} key={this.props.serieIndex} style={{ height: (this.props.type == "vertical") ? 250 : 'auto' }}>
				<label>{this.props.label}</label>
				{this.props.children}
			</div>
		);
	}
}

class DefaultCharts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Charts">
				{this.props.data.map((serie, serieIndex) => {
					var sortedSerie = serie.slice(0),
						sum = serie.reduce((carry, current) => carry + current, 0);

					sortedSerie.sort(compareNumbers);

					return (
						<Chart className={this.props.className} type={this.props.type} label={this.props.labels[serieIndex]} serieIndex={serieIndex}>
							{serie.map((item, itemIndex) => {
								var color = this.props.colors[itemIndex], style,
									size = item / (this.props.max) * 100;

								style = {
									backgroundColor: color,
									opacity: item / this.props.max + .05,
									zIndex: item,
									height: size + '%'
								};

								return (
									<ChartItem style={style} item={item} itemIndex={itemIndex} color={color} className={this.props.className} />
								);
							})}
						</Chart>
					);
				})}
			</div>
		);
	};
}

class LayeredCharts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Charts">
				{this.props.data.map((serie, serieIndex) => {
					var sortedSerie = serie.slice(0),
						sum = serie.reduce((carry, current) => carry + current, 0);

					sortedSerie.sort(compareNumbers);

					return (
						<Chart className={this.props.className} type={this.props.type} label={this.props.labels[serieIndex]} serieIndex={serieIndex}>
							{serie.map((item, itemIndex) => {
								var color = this.props.colors[itemIndex], style,
									size = item / (this.props.max) * 100;

								style = {
									backgroundColor: color,
									opacity: (item / this.props.max + .05),
									zIndex: item,
									height: size + '%',
									right: ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%'
								};

								return (
									<ChartItem style={style} item={item} itemIndex={itemIndex} color={color} className={this.props.className} />
								);
							})}
						</Chart>
					);
				})}
			</div>
		);
	};
}

class StackedCharts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Charts">
				{this.props.data.map((serie, serieIndex) => {
					var sortedSerie = serie.slice(0),
						sum = serie.reduce((carry, current) => carry + current, 0);

					sortedSerie.sort(compareNumbers);

					return (
						<Chart className={this.props.className}
							type={this.props.type}
							label={this.props.labels[serieIndex]}
							serieIndex={serieIndex}>
							{serie.map((item, itemIndex) => {
								var color = this.props.colors[itemIndex], style,
									size = item / sum * 100;

								style = {
									backgroundColor: color,
									opacity: 1,
									zIndex: item,
									height: size + '%'
								};

								return (
									<ChartItem style={style} item={item} itemIndex={itemIndex} color={color} className={this.props.className} />
								);
							})}
						</Chart>
					);
				})}
			</div>
		);
	};
}

class HorizontalCharts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Charts horizontal">
				{this.props.data.map((serie, serieIndex) => {
					var sortedSerie = serie.slice(0),
						sum = serie.reduce((carry, current) => carry + current, 0);

					sortedSerie.sort(compareNumbers);

					return (
						<Chart type={this.props.type}
							label={this.props.labels[serieIndex]}
							serieIndex={serieIndex}>
							{serie.map((item, itemIndex) => {
								var color = this.props.colors[itemIndex], style,
									size = item / (this.props.max) * 100;

								style = {
									backgroundColor: color,
									opacity: item / this.props.max + .05,
									zIndex: item,
									width: size + '%'
								};

								return (
									<ChartItem style={style} item={item} itemIndex={itemIndex} color={color} />
								);
							})}
						</Chart>
					);
				})}
			</div>
		);
	};
}

class ChartsGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let Charts;

		if (this.props.type == "horizontal") {
			Charts = HorizontalCharts;
		} else {
			if (this.props.className == "stacked") {
				Charts = StackedCharts;
			} else if (this.props.className == "layered") {
				Charts = LayeredCharts;
			} else {
				Charts = DefaultCharts;
			}
		}


		return (
			<Charts {...this.props} />
		);
	}
}

class App extends React.Component {
	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const series = 5;
		const serieLength = 5;

		let data = new Array(series).fill(new Array(serieLength).fill(0));
		data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({ data });
	}

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
		const arrayChartsGroup = [
			{ type: "vertical", className: null },
			{ type: "vertical", className: "stacked" },
			{ type: "vertical", className: "layered" },
			{ type: "horizontal", className: null }
		];

		return (
			<section>
				{arrayChartsGroup.map(item => <ChartsGroup data={data} colors={colors} labels={labels} max={max} series={series} type={item.type} className={item.className} />)}
				<LegendGroup labels={labels} colors={colors} />
			</section>
		);
	}
}
