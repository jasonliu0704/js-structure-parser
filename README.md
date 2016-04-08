<snippet>
  <content><![CDATA[
# ${1:Interview Project: Building a Challenge Framework}

## Description:
A whitelist of specific functionality. For example, the ability to say "This program MUST use a 'for loop' and a 'variable declaration'."
A blacklist of specific functionality. For example, the ability to say "This program MUST NOT use a 'while loop' or an 'if statement'."
Determine the rough structure of the program. For example, "There should be a 'for loop' and inside of it there should be an 'if statement'."


## Usage
TODO: Write usage instructions

node types:

statement(Control flow, choice(if), Loops)
expression
declaraion

statement can contain only expressions, declarations and statements

expression can contain nothing

declaration can contain nothing


the input json schema(it follows javascript object format, see code on screen for example):

{
	a:[{type: String}],
	b:[{type: String}],
	c:[{not:  Boolean,
		type: String,
		next:[this] 
	}]
}








## leveraging between Esprima and Acron
performance: on large files, Esprima is slightly faster than Acorn.

file size:Esprima is way bigger than Acron in terms of file size but it support CDN(since their CDN is not relatively stable, it is perfect for prototyping purpose. When the application gets a lot user, hosting files on your own server is a better option). This won't affect end user experience and esprima file isn't that big enough to cost too much resources on server. Therefore, Acron is slightly better.

API quality:

	Esprima: 
		parse javascript and return json object with AST format or token format. It also support options to display locations, comment and parsing errors.

		well tested from its big community(jquery) usage and support

	Acron: 
		has the same features as Esprima in terms of parsing ability except has slightly more options and parsing single strings separately.

		support functionalities to deal with AST nodes

		support command line interface and build system

		support third party plugin between not quite stable



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


## License
TODO: Write license
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>