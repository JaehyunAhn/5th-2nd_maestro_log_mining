var male;
var female;
var ten;
var twenty;
var thirty;
var forty;
var user_id = ''

function getDataFromURL() {
    user_id = document.getElementById("myVar").value;
    var sourceURL = "localhost:81/api?func=prediction&user_id="+user_id;
    var item = $.getJSON(sourceURL, function(data) {
        //alert("Hello World!");
        male = data.male;
        female = data.female;
        ten = data.ten;
        twenty = data.twenty;
        thirty = data.thirty;
        forty = data.forty;

        console.log(male, female, ten, twenty, thirty, forty);
    }).done(draw);
}


function draw(data) {
    var width = 1000;
    var height = 1000;

    var svg  = d3.select("body #D3Result")
    .append("svg")
    //.attr("width", width)
    .attr("height", height);
    var male = data[0].male;
    var female = data[0].female;

    var pivot = [140, 150];
    var radius = 100;

    var sample = svg.append("a")
    .attr("class", "sample")
    .attr("transform", "translate("+pivot[0]+","+pivot[1]+")");

    var male_width = parseFloat(radius*2/100*male);

    sample.append("g")
    .attr("class", "male")
    .append("clipPath")
    .attr("id","g-clip-male")
    .append("rect")
    .attr("y", -radius)
    .attr("height", parseInt(radius*2))
    .attr("x", -radius)
    .attr("width", male_width);

    svg.select("g.male")
    .append("circle")
    .attr("class", "male")
    .attr("clip-path", "url(#g-clip-male)")
    .attr("r", radius);

    svg.select("g.male")
    .append("line");

    sample.append("g")
    .attr("class", "female")
    .append("clipPath")
    .attr("id","g-clip-female")
    .append("rect")
    .attr("y", -radius)
    .attr("height", parseInt(radius*2))
    .attr("x", parseInt(-radius+male_width))
    .attr("width", parseFloat(radius*2 - male_width));

    svg.select("g.female")
    .append("circle")
    .attr("class", "female")
    .attr("clip-path", "url(#g-clip-female)")
    .attr("r", radius);

    var dd = male_width - radius;
    var line_half = Math.sqrt(radius*radius - dd*dd);

    sample.append("line")
    .attr("class", "g-split")
    .attr("x1", dd)
    .attr("y1", -line_half)
    .attr("x2", dd)
    .attr("y2", line_half);

    sample.append("text")
    .attr("class", "txtGender")
    .attr("transform", "translate(-65,-20)")
    .text("Gender");
    sample.append("text")
    .attr("class", "txtPercent")
    .attr("transform", "translate(-20,30)")
    .text(male+" - "+female);

    d3.selectAll("circle").on("mouseover",function(d) {
        this.style.opacity = 1;
    });
    d3.selectAll("circle").on("mouseout", function(d) {
        this.style.opacity=0.5;
    });

    var ten = data[0].ten;
    var twenty = data[0].twenty;
    var thirty = data[0].thirty;
    var forty = data[0].forty;

    var pivot2 = [70, 300];
    var barchart = svg.append("a")
    .attr("class", "barchart")
    .attr("transform", "translate("+pivot2[0]+","+pivot2[1]+")");

    var scale = 5;
    var h = 20;

    // Draw bars
    barchart.append("g")
    .attr("class","line10")
    .append("rect")
    .attr("class", "bar")
    .attr("width", ten*scale)
    .attr("height", h);

    barchart.append("g")
    .attr("class","line20")
    .attr("transform", "translate(0,25)")
    .append("rect")
    .attr("class", "bar")
    .attr("width", twenty*scale)
    .attr("height", h);

    barchart.append("g")
    .attr("class","line30")
    .attr("transform", "translate(0,50)")
    .append("rect")
    .attr("class", "bar")
    .attr("width", thirty*scale)
    .attr("height", h);

    barchart.append("g")
    .attr("class","line40")
    .attr("transform", "translate(0,75)")
    .append("rect")
    .attr("class", "bar")
    .attr("width", forty*scale)
    .attr("height", h);

    // Write labels of bar chart
    d3.select("g.line10")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-40,15)")
    .text("10 대");
    d3.select("g.line20")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-40,15)")
    .text("20 대");
    d3.select("g.line30")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-40,15)")
    .text("30 대");
    d3.select("g.line40")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-40,15)")
    .text("40 대");

    // Write values of bar chart
    d3.select("g.line10")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+parseFloat(ten*scale-30)+",15)")
    .text(ten+"%");
    d3.select("g.line20")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+parseFloat(twenty*scale-30)+",15)")
    .text(twenty);
    d3.select("g.line30")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+parseFloat(thirty*scale-30)+",15)")
    .text(thirty);
    d3.select("g.line40")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+parseFloat(forty*scale-30)+",15)")
    .text(forty);
}
