<snippet>
  <content>
# ${1:Building a Challenge Framework}

## Description:

This is a javascript api testing framework that will allow you to write coding in a code editor , take an input json file
(I set a json file on local but I intend my program can be able to get json file from a remote api endpoint by changing the getJSON paremeter)
to setup a few rules you want your codes to have and finally judge whether your code follows the rules.

rules are:
A whitelist of specific functionality. For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."
A blacklist of specific functionality. For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."
Determine the rough structure of the program. For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."


## Usage

get the files and cd to the folder then `python -m SimpleHTTPServer 8080` and go to localhost:8080

How to define your rules?
	you can changes the ruls through `in.json` file 
	(I intend to use input json file because if I change getJSON parameter, I get then set up rules through calling remote api end point to get json files which
	might be esay for testing and integrating with other systems)

	the input json schema(it follows JSON format, see in.json for example):

	{
		"a":[String],
		"b":[String],
		"c":[{"not":  Boolean,
			"type": String,
			"next":[this] 
		}]
	}
	
	a is an array of whitelist functionality
	b is an array of blacklist functionality
	c is an array of rough structure definition
	("not" to indicate whether this node must contain or must not contain, "type" is the type of the funtionality, "next" is an array of child nodes)

	functionality refers to AST node

	AST node types acceptable:

	statement(Control flow, choice(if), Loops)
	expression
	declaraion

	statement can contain only expressions, declarations and statements

	expression can contain nothing

	declaration can contain nothing



## leveraging between Esprima and Acron
performance: on large files, Esprima is slightly faster than Acorn.

file size:Esprima is bigger than Acron in terms of file size but it supports CDN. This won't affect end user experience and esprima file isn't that big enough to cost too much resources on server. Therefore, Acron is slightly better.

API quality:

	Esprima: 
		parse javascript and return json object with AST format or token format. It also support options to display locations, comment and parsing errors.

		well tested from its big community(jquery) usage and support

	Acron: 
		has the same features as Esprima in terms of parsing ability except has slightly more options and parsing single strings separately.

		support functionalities to deal with AST nodes

		support command line interface and build system

		support third party plugin but not quite stable



documentation:
	
	Esprima: 
		rich and detailed docomentation with helpful demos.
		has details about test benchmarks and browser support
		helpful documentation for potiential developers and contributors

	Acron: 
		we can get almost all the information we want from the documentation but it lacks some details about its other functions other than the main parser.

		error in documentation.(for example tokenizer function won't work, tokenize work)

browser compatibility:
	Acorn works in any JS-enabled browser more recent than IE5
	Esprima runs on web browsers (IE 8+, modern browsers) as well as Rhino, Nashorn, and Node.js.

Conlusion:
	They tie in browser compatibility. Even though Acron is slightly faster and smaller, Esprima has way much better documentation, API quality and community support since implementation based on vague documentation might lead to bugs in the future and good community support guarantees sustainibility of the library and more improvement for the long run. Even though Acorn and Esprima are both esay to use, uncertainy of Acorn might crach my program in the future.
	Therefore, I choose Esprime.

## TODO 
	testing more corner cases
	add all AST nodes availble to be defined
	optimize my implementation
	
## License
TODO: Write license
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>
