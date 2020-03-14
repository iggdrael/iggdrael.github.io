var colorWheel = iro.ColorPicker("#colorWheelDemo", {width: 150, height: 150});
var mySVG = document.getElementById("vetement");
var choixMotif = document.getElementById("choixConfig");
var colorStatus = document.getElementById("colorStatus");
var scaleInput = document.getElementById("scaleInput");
var RotateInput = document.getElementById("RotateInput");

mySVG.addEventListener("load", function(){
	var doc = mySVG.contentDocument;
	var elem = doc.getElementById("vetement");
	var defs = doc.getElementById("defs2");
	var zoneEditElem = doc.getElementById("svg8");
	var editElem = doc.getElementById("vetement");
	var previousEditElem = editElem;
	editElem.style.stroke = "#ff0000";
	var patterns = document.getElementById("patterns");
	var patternsdoc = patterns.contentDocument;

	zoneEditElem.addEventListener("click", function(click){
		console.log(click.target.id);
		editElem = doc.getElementById(click.target.id);
		previousEditElem.style.stroke = "#000000";
		previousEditElem = editElem;
		editElem.style.stroke = "#ff0000";
	})

	choixMotif.addEventListener("click", function(click){
		console.log(click.target.id);

		var appendDef = patternsdoc.getElementById(click.target.id);
		var dupNode = appendDef.cloneNode(true);
	
		if (!doc.getElementById(click.target.id))
			defs.appendChild(dupNode);

		editElem.style.fill = "url(#" + click.target.id +  ")";
		//editElem.setAttribute("style","fill:url(#" + click.target.id + ");");
	});

	scaleInput.addEventListener("input", function() {
		var nom_pat = doc.getElementById(editElem.id).style.fill;
		var edit_pat = nom_pat.substring(6, nom_pat.length - 2);
		doc.getElementById(edit_pat).setAttribute("patternTransform", "scale("+scaleInput.value+"), rotate("+RotateInput.value+')');
	}, false);

	RotateInput.addEventListener("input", function() {
		var nom_pat = doc.getElementById(editElem.id).style.fill;
		var edit_pat = nom_pat.substring(6, nom_pat.length - 2);
		doc.getElementById(edit_pat).setAttribute("patternTransform", "scale("+scaleInput.value+"), rotate("+RotateInput.value+')');
	}, false);

	colorWheel.on('color:change', function(color){
		var nom_pat = doc.getElementById(editElem.id).style.fill;
		var edit_pat = nom_pat.substring(6, nom_pat.length - 2);
		if (colorStatus.value == 1)
			doc.getElementById(edit_pat).querySelector(".couleur1").style.fill = color.hexString;
		else
			doc.getElementById(edit_pat).querySelector(".couleur2").style.fill = color.hexString;
	})
});

function changeColor(colorStatus){
	if (colorStatus.value == 1)
		colorStatus.value = 2;
	else
		colorStatus.value = 1;
}

function svgtopdf(){	
    const mySVG = document.getElementById("vetement");
	const svgDoc = mySVG.contentDocument;
	const svgElement = svgDoc.getElementById("svg8");
	//const elem = svgDoc.getElementById("g6828");

	var margin = 0;
	var width = 297;
	var height = 210;

	const pdf = new jsPDF('p', 'mm', [width, height]);

	svg2pdf(svgElement, pdf, {xOffset: 0,yOffset: 0,scale: 1});


	pdf.save('test.pdf');
}

function showsvg() {
	//previousEditElem.style.stroke = "#000000";
	const mySVG = document.getElementById("vetement");
	const svgDoc = mySVG.contentDocument;
	const svgElement = svgDoc.getElementById("svg8");
    var markup = (new XMLSerializer()).serializeToString(svgElement);
	console.log(markup);

	var content = markup;
	var filename = "MonVetement.svg";

	var blob = new Blob([content], {
 		type: "text/plain;charset=utf-8"
	});
	saveAs(blob, filename);
}
