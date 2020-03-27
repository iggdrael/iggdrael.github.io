var colorWheel = iro.ColorPicker("#colorWheelDemo", {width: 150, height: 150});
var mySVG = document.getElementById("vetement");
var choixMotif = document.getElementById("choixConfig");
var colorStatus = document.getElementById("colorStatus");
var scaleInput = document.getElementById("scaleInput");
var rotateInput = document.getElementById("rotateInput");
var downloadSVG = document.getElementById("downloadSVG");
var upload = document.getElementById("file");

mySVG.addEventListener("load", function(){
	var doc = mySVG.contentDocument;
	var defs = doc.getElementById("defs2");
	var zoneEditElem = doc.getElementById("svg8");
	var editElem = doc.getElementById("vetement");
	var cIm = doc.getElementById("customImage");
	var cImWidth, cImHeight;
	var previousEditElem = editElem;
	editElem.style.stroke = "#ff0000";
	var patterns = document.getElementById("patterns");
	var patternsdoc = patterns.contentDocument;
	var x = 0, y = 0;
	var mdown = false;

	zoneEditElem.addEventListener("mousedown", function(mousedown){
		mdown = true;
		console.log(mousedown.target.id);

		if (!mousedown.target.id.startsWith("svg") && doc.getElementById(mousedown.target.id).tagName != "tspan"){
			editElem = doc.getElementById(mousedown.target.id);
			if (mousedown.target.id != "customImage")
				editElem.style.stroke = "#ff0000";
			if (previousEditElem.id != "customImage")
				previousEditElem.style.stroke = "#000000";
			previousEditElem = editElem;

			if (doc.getElementById(editElem.id).style.fill.startsWith("url") && editElem.id != "customImage"){
				let nom_pat = doc.getElementById(editElem.id).style.fill;
				let edit_pat = nom_pat.substring(6, nom_pat.length - 2);

				let str = doc.getElementById(edit_pat).getAttribute("patternTransform");
				let astrVals = str.split(" ");
				scaleInput.value = parseFloat(astrVals[0].substring(astrVals[0].indexOf('(') + 1, astrVals[0].length - 2), 10);
				rotateInput.value = parseInt(astrVals[2].substring(astrVals[2].indexOf('(') + 1, astrVals[2].length - 1), 10);
			}
			else{
				scaleInput.value = 0.55;
				rotateInput.value = 0;
			}
			mousedown=mousedown || window.event;
            pauseEvent(mousedown);
		}
	})
	zoneEditElem.addEventListener("mouseup", function(){
		mdown = false;
	})

	zoneEditElem.addEventListener("mousemove", function(mousemove){
		if (mdown){
			doc.getElementById(mousemove.target.id).style.cursor = "grab";
			if (mousemove.target.id == "customImage"){
				//let shiftX = mousemove.clientX - cIm.getBoundingClientRect().left;
				//let shiftY = mousemove.clientY - cIm.getBoundingClientRect().top;
				x = x + mousemove.movementX;
				y = y + mousemove.movementY;

				let str = cIm.getAttribute("transform");
				let astrVals = str.split(" ");
				astrVals[0] = "translate("+x+','+y+')';
				str = astrVals.join(" ");

				cIm.setAttribute("transform", str);
			}
			else if (doc.getElementById(editElem.id).style.fill.startsWith("url")){
				x = x + mousemove.movementX;
				y = y + mousemove.movementY;

				let nom_pat = doc.getElementById(editElem.id).style.fill;
				let edit_pat = nom_pat.substring(6, nom_pat.length - 2);

				let str = doc.getElementById(edit_pat).getAttribute("patternTransform");
				let astrVals = str.split(" ");
				astrVals[1] = "translate("+x+','+y+')';
				str = astrVals.join(" ");

				doc.getElementById(edit_pat).setAttribute("patternTransform", str);
			}
		}
		else
			doc.getElementById(mousemove.target.id).style.cursor = "crosshair";
	})*

	choixMotif.addEventListener("click", function(click){
		if (click.target.id != ""){

			if (click.target.id == "file"){}
			else if (click.target.id != "fillUniRect"){ 
				var appendDef = patternsdoc.getElementById(click.target.id);
				var dupNode = appendDef.cloneNode(true);
				
				if (!doc.getElementById(click.target.id)){
					dupNode.setAttribute("patternTransform", "scale(0.55), translate(0,0), rotate(0)");
					defs.appendChild(dupNode);
				}

				editElem.style.fill = "url(#" + click.target.id +  ")";
			}
			else
				editElem.style.fill = document.getElementById("fillUniRect").getAttribute("fill");
		}
	});

	upload.addEventListener("change", function(e){
		var blob = new Blob([e.target.files[0]], {type: 'image/*'}); 
		var reader = new FileReader();
		reader.readAsDataURL(blob); 
		reader.onloadend = function() {
			var base64data = reader.result;                
			cIm.setAttribute("xlink:href", base64data);
			cIm.setAttribute("transform", "translate(0,0), rotate(0)");
			cImHeight = parseInt(cIm.getAttribute("height"), 10);
			cImWidth = parseInt(cIm.getAttribute("width"), 10);
			cIm.style.transformBox = "fill-box";
		}
	});

	scaleInput.addEventListener("input", function() {
		if (editElem.id == "customImage"){
			cIm.setAttribute("width", (cImWidth * (scaleInput.value * 100)) / 100);
			cIm.setAttribute("height", (cImHeight * (scaleInput.value * 100)) / 100);
		}
		else if (doc.getElementById(editElem.id).style.fill.startsWith("url")){
			let nom_pat = doc.getElementById(editElem.id).style.fill;
			let edit_pat = nom_pat.substring(6, nom_pat.length - 2);

			let str = doc.getElementById(edit_pat).getAttribute("patternTransform");
			let astrVals = str.split(" ");
			astrVals[0] = "scale("+scaleInput.value+')';
			str = astrVals.join(" ");

			doc.getElementById(edit_pat).setAttribute("patternTransform", str);
		}
	}, false);

	rotateInput.addEventListener("input", function() {
		if (editElem.id == "customImage"){
			let str = cIm.getAttribute("transform");
			let astrVals = str.split(" ");
			astrVals[1] = "rotate("+rotateInput.value+')';
			str = astrVals.join(" ");

			cIm.setAttribute("transform", str);
		}
		else if (doc.getElementById(editElem.id).style.fill.startsWith("url")){
			let nom_pat = doc.getElementById(editElem.id).style.fill;
			let edit_pat = nom_pat.substring(6, nom_pat.length - 2);
			
			let str = doc.getElementById(edit_pat).getAttribute("patternTransform");
			let astrVals = str.split(" ");
			astrVals[2] = "rotate("+rotateInput.value+')';
			str = astrVals.join(" ");

			doc.getElementById(edit_pat).setAttribute("patternTransform", str);
		}
	}, false);

	colorWheel.on('color:change', function(color){

		if (doc.getElementById(editElem.id).style.fill.startsWith("url")){ 
			var nom_pat = doc.getElementById(editElem.id).style.fill;
			var edit_pat = nom_pat.substring(6, nom_pat.length - 2);
			if (colorStatus.value == 1)
				doc.getElementById(edit_pat).querySelector(".couleur1").style.fill = color.hexString;
			else
				doc.getElementById(edit_pat).querySelector(".couleur2").style.fill = color.hexString;
		}
		else{
			document.getElementById("fillUniRect").setAttribute("fill", color.hexString);
			editElem.style.fill = color.hexString;
		}
	})

	downloadSVG.addEventListener("click", function(){
		if (previousEditElem.id != "customImage")
			previousEditElem.style.stroke = "#000000";
		createPdf(zoneEditElem);
	}, false);
});

function changeColor(colorStatus){
	if (colorStatus.value == 1)
		colorStatus.value = 2;
	else
		colorStatus.value = 1;
}

function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

function createPdf(svg) {
	let doc = new PDFDocument({compress: false, size: [4000, 5000]});
	SVGtoPDF(doc, svg, 0, 0);
	let stream = doc.pipe(blobStream());
	stream.on('finish', function() {
	  const url = stream.toBlobURL('application/pdf');
	  let a = document.getElementById('dwlSVGhref');
	  a.href = url;
	  a.download = "RenduPDF.pdf";
	  a.click();
	  a.removeAttribute("href");
	  a.removeAttribute("download");
	});
	doc.end();
}