
// check whether b has structure a
function structureCheck(a,b){
	var c = search(a ,b);
	if(c == null){
		return false;
	}else if(compare(a,c)){
		return true;
	}else if(c.hasOwnProperty('consequent') && c.consequent.body.length){
		for(var i=0; i < c.consequent.body.length; i++){
			if(structureCheck(a, c.consequent.body[i])){
				return true;
			}
		}
		return false;
	}else if(c.hasOwnProperty('body') && c.body.type == "BlockStatement" && c.body.body.length){
		for(var i=0; i < c.body.body.length; i++){
			if(structureCheck(a, c.body.body[i])){
				return true;
			}
		}
		return false;
	}else{
		return false;
	}
}

// check which node of b is the same as the first node of a and return that
function search(a, b){
	if(a.type == b.type){
		return b;
	}else if(b.hasOwnProperty('consequent') && b.consequent.body.length){
		for(var i=0; i < b.consequent.body.length; i++){
			var res = search(a, b.consequent.body[i]);
			if(res){
				return res;
			}
		}
		return null;
	}else if(b.hasOwnProperty('body') && b.body.type == "BlockStatement" && b.body.body.length){
		for(var i=0; i < b.body.body.length; i++){
			var res = search(a, b.body.body[i]);
			if(res){
				return res;
			}
		}
		return null; 
	}else{
		return null;
	}
}





// a is user defined syntax structure object, b is the AST object
// the find use DFS to find a in b
function compare(a,b){
	if(a.type == b.type){
		// node a still have inner structure
		if(a.next.length){
			// if b still have inner structure
			// if b is choice statement
			if(b.hasOwnProperty('consequent') && b.consequent.body.length){
				var count = 0;
				var neg = 0;
				for(var i=0; i < a.next.length; i++){
					for(var j=0; j<b.consequent.body.length; j++){

						if(a.next[i].has == false){
							neg++;
							if(compare(a.next[i], b.consequent.body[j])){
								return false;
							}
						}else if(a.next[i].has == true){
							if(compare(a.next[i], b.consequent.body[j])){
								count++;
								b.consequent.body[j] = null;
								break;
							}

						}
						
					}
				}
				//check
				if(count == (a.next.length - neg)){
						return true;
				}else{
					return false;
				}
				

			//if b is loop statement
			}else if(b.hasOwnProperty('body') && b.body.type == "BlockStatement" && b.body.body.length){
				var count = 0;
				var neg = 0;
				for(var i=0; i < a.next.length; i++){
					for(var j=0; j<b.body.body.length; j++){

						if(a.next[i].has == false){
							neg++;
							if(compare(a.next[i], b.body.body[j])){
								return false;
							}
						}else if(a.next[i].has == true){
							if(compare(a.next[i], b.body.body[j])){
								count++;
								b.body.body[j] = null;
								break;
							}

						}
						
					}
				}
				//check
				if(count == (a.next.length - neg)){
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

	if(nodes.type == token){
		return true;
	}else if(nodes.hasOwnProperty('consequent')){

		for(var i=0; i<nodes.consequent.body.length; i++){
			
			if(tokenTraverse(nodes.consequent.body[i], token)){
				return true;
			}
		}
	}else if(nodes.hasOwnProperty('body') && nodes.body.type == "BlockStatement"){
		for(var i=0; i<nodes.body.body.length; i++){
			if(tokenTraverse(nodes.body.body[i], token)){
				return true;
			}
		}
	}else{
		return false;
	}
}

function parseOut(schema, nodes){

	//console.log(nodes);

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
				if(structureCheck(schema.c[i], nodes[j])){
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
