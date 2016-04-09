
$.getJSON("in.json", function(json) {
   			 test(json);
});



function test(schema) {
	try{
		var definition;
		
		var nodes = esprima.parse(editor.getValue()).body;
				

	}catch(err){
		$("#result").text(err);
		return;
	}
	
	parseOut(schema, nodes);



	// update and parse when editor codes change
  	$("#editor").keyup(function() {
  		try{
			nodes = esprima.parse(editor.getValue()).body;
			

		}catch(err){
			$("#result").text(err);
			return;
		}
  		parseOut(schema, nodes);
  	});
}


