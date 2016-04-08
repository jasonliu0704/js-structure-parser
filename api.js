/*function parseInput(){
	return obj = esprima.parse(editor.getValue(), {tokens: true});
}
*/
// a is user defined syntax structure object, b is the AST object
// the find use DFS to find a in b
function compare(a,b){
	//if the same type
	if(a.type == b.type){
		// node a still have inner structure
		if(a.next.length){
			// if b still have inner structure
			if(b.hasOwnProperty('consequent') && b.consequent.body.length >= a.next.length){
				var count = 0;
				for(var i = 0; i < a.next.length; i++){
					var j = 0;
					while(j < b.consequent.body.length){
						if(b.consequent.body[j] && compare(a.next[i], b.consequent.body[j])){
							count++;
							b.consequent.body[j] = null;
							break;
						}
						j++;
					}					
				}
				if(count == a.next.length){
					return true;
				}else{
					return false;
				}
			// if be is exhausted
			}else{
				return false;
			}
		// if a is exhausted
		}else{
			return true;
		}
	//if a, b not the same type
	}else{
		return false;
	}
}


//check ast has node
function has(nodes, token){
	return tokenTraverse(nodes, token);
}

//check ast hasn't node
function hasnt(nodes, tokens){
	return !tokenTraverse(nodes, token);
}

//traverse the ast to find token
function tokenTraverse(nodes, token){
	if(nodes.type = token){
		return true;
	}else if(nodes.hasOwnProperty('consequent')){
		for(var i=0; i<nodes.consequent.body.length; i++){
			if(tokenTraverse(nodes.consequent.body[i], token)){
				return true;
			}
		}
/*		return nodes.consequent.body.some(function(node){
			if(tokenTraverse(node, token)){
				return true;
			}
		});
*/
	}else{
		return false;
	}
}

function parseOut(schema, nodes){

		// check whitelist
		var count = 0;
		var out = "attention: ";
		for(var i=0; i<schema.a.length; i++){
			for(var j=0; j<nodes.length; j++){
				if(has(nodes[j], schema.a[i])){
					count++;
					break;
				}
			}
		}

		if(count != schema.a.length){
			out += "violate whitelist, ";
		}

		// check blacklist
		count = 0;
		for(var i=0; i<schema.b.length; i++){
			for(var j=0; j<nodes.length; j++){
				if(has(nodes[j], schema.b[i])){
					//console.log(nodes);
					count++;
					break;
				}
			}
			if(count)break;
		}

		if(count){
			out += "violate blacklist, ";
		}



		// Determine the rough structure of the program
		count = 0;
		for(var i = 0; i<schema.c.length; i++){
			for(var j=0; j<nodes.length; j++){
				if(compare(schema.c[i], nodes[j])){
					count++;
				}
			}
		}
		
		

		if(count != schema.c.length){
			out += "violate the structure definition.";
		}

		if(out == "attention: "){ out = "you are good.";}
		// output to canvas
	    $("#result").text(out);
	  
	}
