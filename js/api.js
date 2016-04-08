

var input = editor.getValue();
var b = parseInput(input);



function parseInput(input){
	return esprima.parse(input);
}

// a is user defined syntax structure object, b is the structure of javascript AST object
function compare(a,b){
	//if the same type
	if(a.type == b.type){
		// node a still have inner structure
		if(a.next.length){
			// if b still have inner structure
			if(b.hasOwnProperty(consequent) && b.consequent.body.length >= a.next.length){
				var count = 0;
				for(var i = 0; i < a.next.length; i++){
					var j = 0;
					while(j < b.consequent.body.length){
						if(b.next[j] && compare(a.next[i], b.next[j])){
							count++;
							b.next[j] = null;
							break;
						}
						j++;
					}					
				}
				if(count == a.next.length - 1){
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
function has(node){
	return tokenTraverse(node);
}

//check ast hasn't node
function hasnt(node){
	return !tokenTraverse(node);
}

function tokenTraverse(node){
	//tokenize javascript input
	var tokens = esprima.tokenize(input);

	//traversing the token array
	tokens.forEach(function(element){
		if(element.type == node){
			return true;
		}
	})

	return false;
}