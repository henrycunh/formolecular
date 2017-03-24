function calcular(){
	// Pega a formula do input
	var formula = $("#input").val();
	// Divide a entrada em moleculas, e.g: "C O2" vira ["C", "O2"]
	var moleculas = formula.split(" ");
	// var decl
	var total = 0;
	var info = `<ul class='instr'>`;
	// GET request para pegar os dados do arquivo JSON
	$.getJSON( "js/data.json", function( data ) {
		/* GET START */
		moleculas.forEach(item => {
			// retorna um objeto {atom, num}
			let mol = getMol(item); // 
			// checando por erro de sintaxe
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
		/* GET END */
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
	// "O22".length > 2
	for(var i = 0; i < molecula.length; i++ ){
		if(!$.isNumeric(molecula[i]) && $.isNumeric(molecula[i+1])){
			return {
				atom: molecula.substr(0,i+1),
				num: molecula.substr(i+1, molecula.length)
			}
		}
	}
}
