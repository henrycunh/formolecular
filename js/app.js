function calcular(){
	var formula = $("#input").val();
	var moleculas = formula.split(" ");
	var total = 0;
	var info = `<ul class='instr'>`;
	$.getJSON( "js/data.json", function( data ) {
		moleculas.forEach(item => {
		let mol = getMol(item);
		if(mol != undefined){
			let element = acharElement(data.elements, mol.atom);
			total += element.atomic_mass * mol.num;
			info += `<li>
			<span class='elem'>${element.symbol}</span>
			${parseFloat(element.atomic_mass).toFixed(2)}
			* ${mol.num} = ${parseFloat(mol.num * element.atomic_mass).toFixed(2)}</li>`;
		}
	});
	info += "<li><b>Total:</b> " + parseFloat(total).toFixed(2) + "</ul>";
	$("#texto").html("MM = " + parseFloat(total).toFixed(2));
	$("#infobox").html(info);




	});
}

function showInfo(){
	$("#infobox").slideToggle(1000);
}

function showGeralInfo(){
	$("#geralinfobox").slideToggle(1000);
}


function acharElement( data, symbol ){
	let result;
	data.forEach( element => {
		if(symbol.toUpperCase() == element.symbol.toUpperCase())
			result = element;
	})
	return result;
}

function getMol( molecula ){
	if(molecula.length == 1){
		return {
			atom: molecula,
			num: 1
		}
	} else if(molecula.length == 2 && !$.isNumeric(molecula[1])){
		return {
			atom: molecula,
			num: 1
		}
	}
	for(var i = 0; i < molecula.length; i++ ){
		if(!$.isNumeric(molecula[i]) && $.isNumeric(molecula[i+1])){
			return {
				atom: molecula.substr(0,i+1),
				num: molecula.substr(i+1, molecula.length)
			}
		}
	}
}
