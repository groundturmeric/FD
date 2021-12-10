// function parseCSV(d) {
//     return {
//         name: d["Museum Name"],
//         lat: +d.Latitude,
//         lon: +d.Longitude,
//         type: d["Museum Type"],
//         city: d["City"],
//         state: d["State"]
//     };
// }

 promises3 = [
    d3.csv("./data/supermarkets.csv"),
    d3.json("./geojson/gz_2010_us_040_00_20m.json"),
    d3.json("./geojson/busroutesTRIMMED.geojson"),
    // d3.json("./geojson/mbtaKeyBusRoutes.json"),
    d3.json("./geojson/MASSlilafinal.geojson"),
    d3.csv("./data/25peopleDotsMAss.csv"),
    d3.json("./geojson/suprmrktservicenetworkFINAL.geojson"),
];


Promise.all(promises3).then(function(data) {


    const supermarkets = data[0];

    // console.log(supermarkets);

    const world = data[1];
    const busRoutes = data[2];
    const tracts = data [3];
    const people = data[4] ;
    const servicenetwork = data[5];

    // console.log(people)



    // console.log (busRoutes);chartmassnetwork

    const width = document.querySelector("#chartmassnetwork").clientWidth;
    const height = document.querySelector("#chartmassnetwork").clientHeight;
    const svg = d3.select("#chartmassnetwork")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


        const projection = d3.geoMercator()
        .center([-71.1366, 42.3499])
        // .translate([0, 0])
        .scale(332850);

    const path = d3.geoPath()
        .projection(projection);

        const tractsPath = d3.geoPath()
        .projection(projection);

        const busRoutesPath = d3.geoPath()
        .projection(projection);

        const networkPath = d3.geoPath()
        .projection(projection)



    // svg.selectAll("path")
    //     .data(world.features)
    //     .enter()
    //     .append("path")
    //     .attr("d", path)
    //     .attr("class", "state");


//DRAW MAP
const tractColorScale = d3.scaleOrdinal(d3.schemeCategory10)
.domain([0,1])
// .range(["rgb(27, 27, 27)", "rgb(111, 111, 111)"])
.range(["#212529", "#343A40"])
// .range(["#212529", "#495057"])



svg.selectAll("path.tracts")
                .data(tracts.features)
                .enter()
                .append("path")
                .attr("d", tractsPath)
                .attr("class", "tracts")
                .attr("stroke-width", 0)
                .style('fill', function(d) {
                    return tractColorScale(d.properties.MAssFilteredData_LA1and10);
                })
        
                // MAssFilteredData_LA1and10
                // MAssFilteredData_LILATracts_1And10





// console.log(servicenetwork)

                const peoplepoints = svg.selectAll("circle.people")
                .data(people)
                .enter().append("circle")
                .attr("class", "people")
                .attr("cx", function(d) {
                    var proj = projection([d.LON10, d.LAT10]);
                    return proj[0];
                }).attr("cy", function(d) {
                    var proj = projection([d.LON10, d.LAT10]);
                    return proj[1];
                }).attr("r", 1)
                .attr("stroke", "white")
                .attr("stroke-width", 0)
                .attr("fill", "turquoise")
                // .attr("fill", "orange")
                // .attr("fill", "honeydew")
                .style("opacity", 0.5);
        
        

                // const colorScale = d3.scaleOrdinal(d3.schemeSet2)
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(["supermarket", "restaurant","convenience store", "fast food","farmers market", ])
        .range(["#80c904","#64DFDF","yellow",  "#5E60CE", "#80FFDB"]);



        const networkpaths = d3.select("svg")
        svg.selectAll("path.networkpath")
        .data(servicenetwork.features)
        .enter()
        .append("path")
        .attr("d", networkPath)
        .attr("class", "networkpath")
        .style("stroke-width" , 0.5)
        .style('stroke', "#4d7902");

        // var colors = [ "#00FB36","#F95B34", "#FF9C34", "#EE3E64", "#F36283",  "#B7D84B","#44ACCF"];
        const busroutes = d3.select("svg")
        svg.selectAll("path.busroutes")
        .data(busRoutes.features)
        .enter()
        .append("path")
        .attr("d", busRoutesPath)
        .attr("class", "busroutes")
        .style("stroke", "white")
        .style("stroke-width" , 0.25);





    const points = svg.selectAll("circle.supermarket")
        .data(supermarkets)
        .enter().append("circle")
        .attr("class", "supermarket")
        .attr("cx", function(d) {
            var proj = projection([d.Long, d.Lat]);
            return proj[0];
        }).attr("cy", function(d) {
            var proj = projection([d.Lon, d.Lat]);
            return proj[1];
        }).attr("r", 5)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", function(d) {
            return colorScale(d.type);
        })




    

   
        
// select SVG path elements with class "land"
// d3.selectAll("path.land");
    
//<><><><<><><><><><><TOOLTIP><><><><><><><><><><><><//



    // const tooltip = d3.select("#chartmass")
    //     .append("div")
    //     .attr("class", "tooltip");

    // svg.selectAll("circle.supermarket")
    //     .on("mouseover", function(e, d) {

    //         let cx = +d3.select(this).attr("cx")*k + tX + 0;
    //         let cy = +d3.select(this).attr("cy")*k + tY - 0;

    //         tooltip.style("visibility", "visible") 
    //             .style("left", cx + "px") 
    //             .style("top", cy + "px") 
    //             .html(`<b>${d.name}</b><br>${d.type}`);

    //         d3.select(this)
    //             .attr("r", 10 / k)
    //             // .attr("r", 10 / k)
    //             // .attr("stroke", "white")
    //             .attr("stroke-width", 3/ k);

    //     }).on("mouseout", function() {

    //         tooltip.style("visibility", "hidden");

    //         d3.select(this)
    //             .attr("r", 3 / k)
    //             // .attr("stroke", "white")
    //             .attr("stroke-width", 0);

    //     });


       //><><><><><>ToolTip on TRACTS><><><><><><><


    //     svg.selectAll("path.tracts")
    //     .on("click",function(d, i,) {
    //         // console.log("just had a mouseover", d3.select(d));

    //         console.log(this);

    //         d3.select(this)
    //           .classed("active",true)
    //           .style('fill',"rgb(142, 0, 0)")
    // ;
 

    //           let ttx = d3.pointer(event)[0]*k + tX;
    //           let tty = d3.pointer(event)[1]*k +tY;

    //           tooltip.style("visibility", "visible") 
    //           .style("left", (ttx) + "px")
    //           .style("top", (tty) + "px")
    //           .html(`<b>Median Family Income: </b>${i.properties.MAssFilteredData_MedianFamilyIncome} $<br>
    //           <b>Poverty Rate</b> ${i.properties.MAssFilteredData_PovertyRate}% <br>
    //                 <b>County: </b> ${i.properties.MAssFilteredData_County}<br>
    //                 <b>Tract Geoid:</b> ${i.properties.GEOID10}<br>`);

        

    //       })
    //       .on("mouseout",function(d){
    //         d3.select(this)
    //           .classed("active",false)
    //           .style('stroke-width', 0)
    //           .style('fill', function(d) {
    //             return tractColorScale(d.properties.MAssFilteredData_LA1and10);
    //         })
    // ;

    //           tooltip.style("visibility", "hidden");
    //     });










        /* FILTER BY CHECKBOX

        We'll use the same filtering pattern we've seen before
        to filter the markers on the map by museum type.

        */

        d3.selectAll(".type--option2").on("click", function() {

            let isChecked = d3.select(this).property("checked");
            let foodType = d3.select(this).property("value");

            let selection = points.filter(function(d) {
                return d.type === foodType;
            });

            if (isChecked == true) {
                selection.attr("opacity", 1)
                    .attr("pointer-events", "all");
            } else {
                selection.attr("opacity", 0)
                    .attr("pointer-events", "none");
            }
            
        });


        /*
        ADDING ZOOM

        Maps are great candidates for zooming. But zooming is actually
        a very complex task -- made especially complex in SVG!

        D3 has a built-in module, d3.zoom() for handling zoom events.

        */

        // const zoom = d3.zoom()
        //     .scaleExtent([1, 10])
        //     .on('zoom', zoomed);

        // svg.call(zoom);

        // let k = 1;
        // let tX = 0;
        // let tY = 0;

        // function zoomed(e) {

        //     console.log(e);

        //     k = e.transform.k;
        //     tX = e.transform.x;
        //     tY = e.transform.y;

        //     svg.selectAll("*").attr("transform", e.transform);

        //     svg.selectAll("circle").attr("r", 3 / k)
        
        // }

});




// ><><><><><><>><><><><><><><><>
// MAGNIFIER
