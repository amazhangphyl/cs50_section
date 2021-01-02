// Load CSV file
let agg_data;
let tiered;
d3.csv("data/aggregated_tiers.csv").then( function(data) {
	agg_data = data;
	start1();
});

function start1() {
	d3.csv("data/tiered.csv").then(data => {
		tiered = data;
		console.log(tiered);
		start2();
	});
}

function start2() {

	// BAR CHART INSTANTIATION

	// Margin object with properties for the four directions
	let margin_bar = {top: 20, right: 40, bottom: 20, left: 20};

	// Width and height as the inner dimensions of the chart area
	let width_bar = $("#tiered").width() - margin_bar.left - margin_bar.right;
	let height_bar = $("#tiered").height() - margin_bar.top - margin_bar.bottom;

	let title = d3.select("#tiered")
		.append("div")
		.append("p")
		.text("Number of Students in Each College Tier For the Selected Percentile");

	// Define 'svg' as a child-element (g) from the drawing area and include spaces

	let svg_bar = d3.select("#tiered").append("svg")
		.attr("width", width_bar + margin_bar.left + margin_bar.right)
		.attr("height", height_bar + margin_bar.top + margin_bar.bottom)
		.append("g")
		.attr("transform", "translate(" + margin_bar.left + "," + margin_bar.top + ")");

	let tierScale = d3.scaleBand()
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
		.range([margin_bar.left, width_bar - margin_bar.right])
		.paddingInner(0.2)
		.paddingOuter(0.2);

	let countScale = d3.scaleLinear()
		.domain([0, 60000])
		.range([height_bar - margin_bar.top, margin_bar.bottom]);

	let xAxis_bar = d3.axisBottom()
		.scale(tierScale);

	let yAxis_bar = d3.axisLeft()
		.scale(countScale);

	svg_bar.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height_bar - margin_bar.top) + ")")
		.call(xAxis_bar)
		.append("text")
		.attr("fill", "black")
		.attr("transform", "translate(" + width_bar * 0.5 + "," + height_bar * 0.1 +")")
		.text("College Tier");

	svg_bar.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + margin_bar.left + ",0)")
		.call(yAxis_bar)
		.append("text")
		.attr("fill", "black")
		.attr("transform", "translate(15, 40)rotate(-90)")
		.text("Number of Students");

	// LINE CHART

	// Margin object with properties for the four directions
	let margin = {top: 20, right: 42, bottom: 20, left: 40};

	// Width and height as the inner dimensions of the chart area
	let width = $("#aggregate").width() - margin.left - margin.right;
	let height = $("#aggregate").height() - margin.top - margin.bottom;

	d3.select("#aggregate")
		.append("div")
		.append("p")
		.text("Parent Income Percentile vs Students Attending College");

	// Define 'svg' as a child-element (g) from the drawing area and include spaces
	let svg = d3.select("#aggregate").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let pctileScale = d3.scaleLinear()
		.domain([0, 99])
		.range([margin.left, width - margin.right]);

	let pop_max = parseInt(d3.max(agg_data, d => d["count"])) + 10000;
	console.log(pop_max);
	let popScale = d3.scaleLinear()
		.domain([0, pop_max])
		.range([height - margin.top, margin.top]);

	let area = d3.area()
		.x(d => pctileScale(d["par_pctile"]))
		.y1(function (d) {
			return popScale(d["count"]);
		})
		.y0(height - margin.top);

	svg.append("path")
		.datum(agg_data)
		.attr("class", "area")
		.attr("d", area)
		.attr("fill", "dodgerblue")
		.attr("fill-opacity", 0.5)

	let xAxis = d3.axisBottom()
		.scale(pctileScale);

	let yAxis = d3.axisLeft()
		.scale(popScale);

	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + (height - margin.top) + ")")
		.call(xAxis)
		.append("text")
		.attr("fill", "black")
		.attr("transform", "translate(" + width * 0.5 + "," + height * 0.1 +")")
		.text("Parent Income Percentile");

	svg.append("g")
		.attr("class", "axis y-axis")
		.attr("transform", "translate(" + margin.left + ",0)")
		.call(yAxis)
		.append("text")
		.attr("fill", "black")
		.attr("transform", "translate(15, 40)rotate(-90)")
		.text("Number of Students");

    let tooltip = svg.append("g")
        .attr("class", "tooltips")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add vertical line
    tooltip.selectAll(".tooltips")
        .data(agg_data)
        .enter()
        .append("rect")
        .attr("class", "tooltip-line")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height - margin.bottom - margin.top)
        .attr("width", 0.1)
        .style("stroke", "dodgerblue")
        .style("fill", "dodgerblue");

    // add count text
    let tooltip_pop = tooltip.selectAll(".tooltips")
        .data(agg_data)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", 30)
        .attr("class", "tooltip-population")
		.style("font-size", 11);

    // add percentile text
    let tooltip_pct = tooltip.selectAll(".tooltips")
        .data(agg_data)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", 50)
        .attr("class", "tooltip-pct")
		.style("font-size", 11);

    // create an area for users to interact
    let rectangle = svg.append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top)
        .style("fill", "black")
        .attr("fill-opacity", 0)
        .on("mouseover", function(){
            console.log("mouseover");
            svg.selectAll(".tooltips")
                .style("display", null)
        })
        .on("mouseout", function(){
            console.log("mouseout");
            svg.selectAll(".tooltips")
                .style("display", "none");
        })
        .on("mousemove", function(event){
            console.log("mousemove");
            mousemove(event);
        });

    // be able to determine where the user's mouse is
    let bisect = d3.bisector(d => d["par_pctile"]).left;

    function mousemove(event){
        let x_pos = d3.pointer(event)[0];
        let x = pctileScale.invert(x_pos);
        let idx = bisect(agg_data, x);
        let count = agg_data[idx]["count"];
        tooltip.selectAll(".tooltip-line")
            .data(agg_data)
            .style("fill", "blue")
            .attr("transform", "translate(" + (x_pos - margin.left) + ", 0)");
        tooltip.selectAll(".tooltip-population")
            .data(agg_data)
            .attr("transform", "translate(" + (x_pos - margin.left) + ", 0)")
            .text("#: " + count);
        tooltip.selectAll(".tooltip-pct")
            .data(agg_data)
            .attr("transform", "translate(" + (x_pos - margin.left) + ", 0)")
            .text("%: " + agg_data[idx]["par_pctile"]);
        updateBar(agg_data[idx]["par_pctile"])
    };

    // UPDATE THE BAR CHART

	function updateBar(pct){

		title
			.text("Number of Students in Each College Tier For the " + pct + " Percentile")
			.merge(title)

		cleanedTiers = [];
		for (let i = 0; i < tiered.length; i++){
			let row = tiered[i];
			if (parseInt(row["par_pctile"]) == pct){
				cleanedTiers.push(row);
			}
		}

		let bars = svg_bar
			.selectAll(".bars")
			.data(cleanedTiers)

		bars
			.enter()
			.append("rect")
			.merge(bars)
			.attr("class", "bars")
			.attr("x", (d) => tierScale(d["tier"]))
			.attr("y", (d) => countScale(d["count"]))
			.attr("width", tierScale.bandwidth())
			.attr("height", (d) => height_bar - margin_bar.top - countScale(d["count"]))
			.style("fill", "#ff4a53");
	}
}