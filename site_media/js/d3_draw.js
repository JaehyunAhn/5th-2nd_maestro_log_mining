var male;
var female;
var ten;
var twenty;
var thirty;
var forty;
var user_id = ''

function keyWordAnalyzer(){
    var width = 300;
    var height = 800;
    var radius = 75;
    keyword = document.getElementById("searchKeyWord").value;
    var new_url = 'http://soma2.jhjh.pe.kr:81/api?func=grouping&query='+keyword;

    var color_gender = d3.scale.ordinal()
    .range(["#59A8E8", "#FD6D7C"]);
    var color_age = d3.scale.ordinal()
    .range(["#8DC655", "#E7679D", "#7A76BF", "#00BEB3"]);

    var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 45);

    var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.prob; });

    var svg = d3.select("body #tab2").append("svg")
    .attr("width", width)
    .attr("height", height);

    var svg_gender = d3.select("svg")
    .append("g")
    .attr("class", "donut_gender")
    .attr("transform", "translate(" + width / 2 + ", 150)");
    var svg_age = d3.select("svg")
    .append("g")
    .attr("class", "donut_age")
    .attr("transform", "translate(" + width / 2 + ", 400)");

    var age_data = [];
    var gender_data = [];


    d3.json(new_url, function(data) {
        for (i = 0; i < 2; i++) {
            gender_data.push(data[i]);
        }
        for (i = 2; i < 6; i++) {
            age_data.push(data[i]);
        }
        draw_age(age_data);
        draw_gender(gender_data);
    });
    function draw_gender(data) {
        var g = svg_gender.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

        g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color_gender(d.data.label); });

        g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { 
		if(d.data.prob < 7.0) return '';
		else
			return String(d.data.prob.toFixed(0))+' %'; 
	});

        svg_gender.append("text")
        .attr("class", "title")
        .attr("transform", "translate(-15,7)")
        .text("성별");

        svg_gender.append("image")
        .attr("xlink:href", "/site_media/img/female.png")
        .attr("width", 50)
        .attr("height", 50)
        .attr("transform", "translate(-135,-50)");

        svg_gender.append("text")
        .attr("class", "gender_legend")
        .attr("transform", "translate(-125,30)")
        .text("여성");

        svg_gender.append("image")
        .attr("xlink:href", "/site_media/img/male.png")
        .attr("width", 50)
        .attr("height", 50)
        .attr("transform", "translate(80,-50)");

        svg_gender.append("text")
        .attr("class", "gender_legend")
        .attr("transform", "translate(90,30)")
        .text("남성");
    }
    function draw_age(data) {
        var g = svg_age.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

        g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color_age(d.data.label); });

        g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { 
		if(d.data.prob < 7.0) return '';
		else return String(d.data.prob.toFixed(0))+' %'; 
	});

        svg_age.append("text")
        .attr("class", "title")
        .attr("transform", "translate(-15,7)")
        .text("연령");

        var pos = [ [0,0], [80,0], [0,20], [80,20] ];
        var pos_age = d3.scale.ordinal().range(pos);
        var legend_box = svg_age.append("a").attr("transform", "translate(-55,130)");
        var legend = legend_box.selectAll(".text")
        .data(data).enter().append("g")
        .attr("transform",function(d) {
            return "translate(" + pos_age(d.label)[0] + "," + pos_age(d.label)[1] + ")";
        });

        legend.append("text")
        .attr("class", "age-legend")
        .attr("transform", "translate(15,0)")
        .text(function(d) {return d.label; });

        legend.append("circle")
        .attr("fill", function(d) { return color_age(d.label); })
        .attr("r", 7)
        .attr("transform","translate(0,-4)");
    }
}

function getDataFromURL() {
    user_id = document.getElementById("myVar").value;
    var sourceURL = "http://106.185.24.52:81/api?func=prediction&user_id="+user_id;


    var item = $.getJSON(sourceURL, function(data) {  
        //alert("Hello World!");
        male = data.male;
        female = data.female;
        ten = data.ten;
        twenty = data.twenty;
        thirty = data.thirty;
        forty = data.forty;

        //console.log(male, female, ten, twenty, thirty, forty);
    }).done(draw);
}

function draw(data) {
    var width = 400;
    var height = 1000;

    var svg  = d3.select("body #tab1")
    .append("svg")
    //.attr("width", width)
    .attr("height", height);

    var pivot = [140, 150];
    var radius = 101;

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
    .attr("transform", "translate(-81,-20)")
    .text("Gender");
    sample.append("text")
    .attr("class", "txtPercent")
    .attr("transform", "translate(-43,30)")
    .text(male+" - "+female);

    d3.selectAll("circle").on("mouseover",function(d) {
        this.style.opacity = 1;
    });
    d3.selectAll("circle").on("mouseout", function(d) {
        this.style.opacity=0.5;
    });

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
    .attr("transform", "translate(-45,15)")
    .text("10 대");
    d3.select("g.line20")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-45,15)")
    .text("20 대");
    d3.select("g.line30")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-45,15)")
    .text("30 대");
    d3.select("g.line40")
    .append("text")
    .attr("class", "txtLabel")
    .attr("transform", "translate(-45,15)")
    .text("40 대");

    // Write values of bar chart
    d3.select("g.line10")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+Math.max(parseFloat(ten*scale-40), 10)+",15)")
    .text(ten+" %");
    d3.select("g.line20")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+Math.max(parseFloat(twenty*scale-40), 10)+",15)")
    .text(twenty);
    d3.select("g.line30")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+Math.max(parseFloat(thirty*scale-40), 10)+",15)")
    .text(thirty);
    d3.select("g.line40")
    .append("text")
    .attr("class", "txtValue")
    .attr("transform", "translate("+Math.max(parseFloat(forty*scale-40), 10)+",15)")
    .text(forty);
}
