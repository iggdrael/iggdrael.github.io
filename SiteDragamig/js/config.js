var colorWheel = iro.ColorPicker("#colorWheelDemo", {width: 150, height: 150});
var mySVG = document.getElementById("vetement");
var svgDoc;
var choixMotif = document.getElementById("choixConfig");
var colorStatus = document.getElementById("colorStatus");

mySVG.addEventListener("load", function() {
	svgDoc = mySVG.contentDocument;
	var svgElem = svgDoc.getElementById("vetement");
	//svgElem.setAttribute("style", "fill:url(#tartan)");
	var couleur1 = svgDoc.getElementsByClassName("couleur1");
	var couleur2 = svgDoc.getElementsByClassName("couleur2");
    
    var SVGstyles;
	choixMotif.addEventListener("click", function(click){
        SVGstyles = svgElem.getAttribute("style");
        svgElem.setAttribute("style","fill:url(#" + click.target.firstChild.id + ");");
	});

	colorWheel.on('color:change', function(color){
		if (colorStatus.value == 1)
			for (let i = 0; i < couleur1.length; couleur1[i].setAttribute("style", "fill:"+color.hexString), i++);
		else
			for (let i = 0; i < couleur2.length; couleur2[i].setAttribute("style", "fill:"+color.hexString), i++);

	})
}, false);

function svgtopdf(){	
    const mySVG = document.getElementById("vetement");
	const svgDoc = mySVG.contentDocument;
	const svgElement = svgDoc.getElementById("svg8");
	console.log("disp " + svgElement.style.display);
	const elem = svgElement.getElementById("g4075");

	svgElement.style.display = "block";

	var margin = 0;
	var width = 300;//svgElement.width.baseVal.value + 2 * margin;
	var height = 300;//svgElement.height.baseVal.value + 2 * margin;

	const pdf = new jsPDF('l', 'mm', [width, height]);
	svg2pdf(svgElement, pdf, {xOffset: 0,yOffset: 0,scale: 1});

	svgElement.style.display = "none";

	pdf.save('test.pdf');
}
