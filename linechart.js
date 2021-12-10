
    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#linechart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    //Read the data
    d3.csv("data/usdaFoodSecurity.csv", function(data) {

      var parseTime = d3.timeParse("%Y");

// data.forEach(function(d) {
//   d.Year = parseTime(d.Year);
  
// });
      // group the data: I want to draw one line per group
      var sumstat = d3.group(data, d => d.SubCategoryRevised) // nest function allows to group the calculation per level of a factor
        .Array.from(d3.group(data, d => d.SubCategoryRevised));
        // .entries(data);
    console.log(data)
      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return parseTime(d.Year); }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5))
        .attr("class", "axis");
        
    
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.Value; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "axis");
    
      // color palette
      var res = sumstat.map(function(d){ return d.SubCategoryRevised }) // list of group names
      var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])
    
      // Draw the line
      svg.selectAll(".line")
          .data(sumstat)
          .enter()
          .append("path")
            .attr("fill", "none")
            .attr("stroke", function(d){ return color(d.SubCategoryRevised) })
            .attr("stroke-width", 1.5)
            .attr("d", function(d){
              return d3.line()
                .x(function(d) { return x(parseTime(d.Year)); })
                .y(function(d) { return y(+d.Value); })
                (d.values)
            })
            
    


     


            const circle = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("cx", function(d) { return x(parseTime(d.Year)); })
          .attr("cy", function(d) { return y(d.Value); })
          .attr("r",3)
          .attr("fill",function(d){ return color(d.SubCategoryRevised) });


          d3.csv("data/usdaFoodSecurityfirstRow.csv", function(data) {

var parseTime = d3.timeParse("%Y");

          svg.append("g").selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x", 0)
.attr("y", function(d) { return y(d.Value)  })
.attr("fill",function(d){ return color(d.SubCategoryRevised) })
.text(function(d) { return d.SubCategoryRevised });


          });


    const tooltip = d3.select("#linechart")
      .append("div")
      .attr("class", "tooltip");


  

    // TOOTLTIP

    circle.on("mouseover", function(e, d) {

let cx = d3.select(this).attr("cx");
let cy = d3.select(this).attr("cy");


tooltip.style("visibility","visible")
  .style("left", `${cx}px`)
  .style("top", `${cy}px`)
  .html(`<b>year:</b> ${e.Year}<br><b>subcategory:</b> ${e.SubCategoryRevised}`);



d3.select(this)
  .attr("stroke", "#F6C900")
  .attr("stroke-width",11);

}).on("mouseout", function () {

d3.select(this)
  .attr("stroke", "none")
  .attr("stroke-width", 0)
  tooltip.style("visibility", "hidden");
;

});






})

