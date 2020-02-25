var colorWheel = iro.ColorPicker("#colorWheelDemo", {width: 150, height: 150});
var mySVG = document.getElementById("vetement");
var svgDoc;
var choixMotif = document.getElementById("choixConfig");
var colorStatus = document.getElementById("colorStatus");

mySVG.addEventListener("load", function() {
	svgDoc = mySVG.contentDocument;
	var svgElem = svgDoc.getElementById("vetement");
	svgElem.setAttribute("style", "fill:url(#tartan)");
	var couleur1 = svgDoc.getElementsByClassName("couleur1");
	var couleur2 = svgDoc.getElementsByClassName("couleur2");
	
	choixMotif.addEventListener("click", function(click){		
		svgElem.setAttribute("style", "fill:url(#" + click.target.firstChild.id + ")");
	});

	colorWheel.on('color:change', function(color){
		if (colorStatus.value == 1)
			for (let i = 0; i < couleur1.length; couleur1[i].setAttribute("style", "fill:"+color.hexString), i++);
		else
			for (let i = 0; i < couleur2.length; couleur2[i].setAttribute("style", "fill:"+color.hexString), i++);

	})
}, false);


function changeColor(colorStatus){
	if (colorStatus.value === "1")
		colorStatus.value = 2;
	else
		colorStatus.value = 1;
}

function SvgToPdf(){
    const width = 400, height = 600;

// create a new jsPDF instance
    const pdf = new jsPDF('l', 'pt', [width, height]);

// render the svg element
    svg2pdf(svgElem, pdf, {
	    xOffset: 0,
	    yOffset: 0,
	    scale: 1
    });

// get the data URI
    const uri = pdf.output('datauristring');

// or simply save the created pdf
    pdf.save('svg.pdf');
}

function save() {
    console.time("t");
    console.log(svgElem);
    var margin = 0;
    var width = svgElem.width.baseVal.value + 2 * margin;
    var height = svgElem.height.baseVal.value + 2 * margin;
    var pdf = new jsPDF('l', 'pt', [width, height]);
    svg2pdf(svgElem, pdf, {});

    pdf.save();

    console.timeEnd("t");
  }
