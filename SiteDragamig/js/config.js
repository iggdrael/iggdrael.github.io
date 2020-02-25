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

function save(){	
    const mySVG = document.getElementById("vetement");
    const svgDoc = mySVG.contentDocument;
    const svgElement = svgDoc.getElementById("vetement");
    console.log(svgElement);

    var margin = 0;
    var width = 1000;//svgElement.width.baseVal.value + 2 * margin;
    var height = 1000;//svgElement.height.baseVal.value + 2 * margin;
// create a new jsPDF instance
    const pdf = new jsPDF('l', 'pt', [width, height]);

// render the svg element
    svg2pdf(mySVG, pdf, {
        xOffset: 0,
        yOffset: 0,
        scale: 1
    });

// get the data URI
    const uri = pdf.output('datauristring');
    console.log(uri);

// or simply save the created pdf
    pdf.save('myPDF.pdf');
}
