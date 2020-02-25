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

function save() {
    console.time("t");
    var mySVG = document.getElementById("vetement");
    var svgDoc = mySVG.contentDocument;
    var svgElem = svgDoc.getElementById("vetement");

    console.log(mySVG);
    console.log(svgElem);
    var margin = 0;
    var width = 300;//svgElem.width.baseVal.value + 2 * margin;
    var height = 800;//svgElem.height.baseVal.value + 2 * margin;
    var pdf = new jsPDF('l', 'pt', [width, height]);
    svg2pdf(mySVG, pdf, {});

    pdf.save();

    console.timeEnd("t");
  }
