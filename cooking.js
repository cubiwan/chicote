var input = require("./recipe.json");
var know = require("./cookbook.json");

var fs = require("fs");
var path = require("path");
var Mustache = require("./js/mustache.js");


filedata = fs.readFileSync('./js/pluralize.js','utf8');
var plural = eval(filedata);

var v = require('./js/voca.js');

let date = new Date();
var counter = 0;

input["timestamp"] = date.getTime();
input["date"] = date.toISOString().split('T')[0];
input["time"] = date.toISOString().split('T')[1].split('.')[0]
input["GUID"] = createGuid();

input["plural"] = functionToTagAfterRender(plural);
input["camel"] = functionToTagAfterRender(v.camelCase)
input["capital"] = functionToTagAfterRender(v.capitalize);
input["decapital"] = functionToTagAfterRender(v.decapitalize);
input["dash"] = functionToTagAfterRender(v.kebabCase);
input["snake"] = functionToTagAfterRender(v.snakeCase);
input["swap"] = functionToTagAfterRender(v.swapCase);
input["title"] = functionToTagAfterRender(v.titleCase);
input["lower"] = functionToTagAfterRender(v.lowerCase);
input["upper"] = functionToTagAfterRender(v.upperCase);

input["reverse"] = functionToTagAfterRender(v.reverse);
input["stripTags"] = functionToTagAfterRender(v.stripTags);
input["escHtml"] = functionToTagAfterRender(v.escapeHtml);
input["unHtml"] = functionToTagAfterRender(v.unescapeHtml);
input["escRegExp"] = functionToTagAfterRender(v.escapeRegExp);
input["trim"] = functionToTagAfterRender(v.trim);
input["latin"] = functionToTagAfterRender(v.latinise);

input["delSpaces"] = functionToTagAfterRender(delSpaces);
input["delDuplicateSpaces"] = functionToTagAfterRender(delDuplicateSpaces);

input["repeat2"] = functionToTagBeforeRender(repeat2);
input["repeat3"] = functionToTagBeforeRender(repeat3);
input["repeat4"] = functionToTagBeforeRender(repeat4);
input["repeat5"] = functionToTagBeforeRender(repeat5);
input["repeat6"] = functionToTagBeforeRender(repeat6);
input["repeat7"] = functionToTagBeforeRender(repeat7);
input["repeat8"] = functionToTagBeforeRender(repeat8);
input["repeat9"] = functionToTagBeforeRender(repeat9);

input["sortAscL"] = functionToTagAfterRender(sortAscL);
input["sortDescL"] = functionToTagAfterRender(sortDescL);
input["trimL"] = functionToTagAfterRender(trimL);
input["joinL"] = functionToTagAfterRender(joinL);
input["removeDuplicateL"] = functionToTagAfterRender(removeDuplicateL);
input["spaceL"] = functionToTagAfterRender(spaceL);
input["space2L"] = functionToTagAfterRender(space2L);
input["space4L"] = functionToTagAfterRender(space4L);
input["space8L"] = functionToTagAfterRender(space8L);
input["tabL"] = functionToTagAfterRender(tabL);
input["tab2L"] = functionToTagAfterRender(tab2L);
input["tab3L"] = functionToTagAfterRender(tab3L);
input["tab4L"] = functionToTagAfterRender(tab4L);
input["tab5L"] = functionToTagAfterRender(tab5L);
input["tab6L"] = functionToTagAfterRender(tab6L);


input["log"] = functionToTagAfterRender(console.log);

input["K"] = function() {
	return function (text, render) {
		return render(know[render(text)]);
	};
};
input["R"] = function() {
	return function (text, render) {			
		return render(text);
	};
}

input["C0"] = functionToTagAfterRender(resetCounter);
input["C+"] = functionToTagAfterRender(incCounter);
input["C-"] = functionToTagAfterRender(decCounter);
input["C"] = functionToTagAfterRender(writeCounter);

function resetCounter(text){	
	counter = 0;
	return text;
}

function incCounter(text){
	counter++;
	return text;
	
}

function writeCounter(text){	
	return counter+text;	
}

function decCounter(text){
	counter--;
	return render(text);	
}


function sortAscL(text){	
	let lines = getLines(text);
	lines.sort();	
	return joinLines(lines);
}

function sortDescL(text){	
	let lines = getLines(text);
	lines.sort().reverse();
	return joinLines(lines);
}

function joinL(text){
	let lines = getLines(text);
	return lines.join('');
}

function trimL(text){	
	let lines = getLines(text);
	lines.map(x => x.trim());
	return joinLines(lines);
}

function removeDuplicateL(text){
	let lines = getLines(text);
	return lines.filter((item, i, allItems) => {
		return i === allItems.indexOf(item);
	})
	.join("\n");
}

function spaceL(text){	
	let lines = getLines(text);
	lines = lines.map(x => " "+x.trim());
	return joinLines(lines);
}

function space2L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "  "+x.trim());
	return joinLines(lines);
}

function space4L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "    "+x.trim());
	return joinLines(lines);
}

function space8L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "        "+x.trim());
	return joinLines(lines);
}

function tabL(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t"+x.trim());
	return joinLines(lines);
}

function tab2L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t\t"+x.trim());
	return joinLines(lines);
}

function tab3L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t\t\t"+x.trim());
	return joinLines(lines);
}

function tab4L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t\t\t\t"+x.trim());
	return joinLines(lines);
}

function tab5L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t\t\t\t\t"+x.trim());
	return joinLines(lines);
}

function tab6L(text){	
	let lines = getLines(text);
	lines = lines.map(x => "\t\t\t\t\t\t"+x.trim());
	return joinLines(lines);
}


function getLines(text){
	return text.split(/\r?\n/);
}

function joinLines(lines){
	return lines.join("\n");
}


// http://guid.us/GUID/JavaScript
function createGuid(){  
	function S4() {  
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
	}  
	return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
}  

function delSpaces(text){
	return text.replace(/\s+/g, '');
}

function delDuplicateSpaces(text){
	return text.replace(/\s+/g, ' ');
}


function repeat2(text){	
	return text+""+text;
}

function repeat3(text){
	return text+""+repeat2(text);
}

function repeat4(text){
	return text+""+repeat3(text);
}

function repeat5(text){
	return text+""+repeat4(text);
}

function repeat6(text){
	return text+""+repeat5(text);
}

function repeat7(text){
	return text+""+repeat6(text);
}

function repeat8(text){
	return text+""+repeat7(text);
}

function repeat9(text){
	return text+""+repeat8(text);
}



function functionToTagAfterRender(f){
	return function () {
		return function (text, render) {			
			return f(render(text))
		};
	}
}

function functionToTagBeforeRender(f){
	return function () {
		return function (text, render) {			
			return render(f(text))
		};
	}
}



Mustache.escape = function(text) {return text;};

var step = [];
var vars = [];
var templates = [];
var directories = [];
var dirs = [];
var paths = [];

console.log("Del output");
rmdir("./output/");

console.log("Creating dir: output");
fs.mkdirSync("./output");

for(index in input.steps){	
	step = require("./steps/"+ input.steps[index]+".json");
	if(step.templates) {
		templates = templates.concat(step.templates);
	}
	if(step.directories) {
		dirs = dirs.concat(step.directories);
	}
	if(step.vars) {
		vars = vars.concat(step.vars)
	}
}

for (index in vars){
	input[vars[index][0]] = Mustache.render(vars[index][1], input);	
}

for (index in dirs) {
	directories = directories.concat(extractPaths(dirs[index]));
}

for (index in directories) {
	paths[directories[index]] = Mustache.render(directories[index], input);
	if (!fs.existsSync("./output/"+paths[directories[index]])) {
		console.log("Creating dir: "+paths[directories[index]]); 
		fs.mkdirSync("./output/"+paths[directories[index]]);
	}
}

for (index in templates){	
	fs.readFile("./templates/"+templates[index][0], "utf8", parserTemplate(index));
}

return;
//END

function parserTemplate(index){
	return function(err, file){ 
		var result = Mustache.render(file, input);
		var filename = Mustache.render(templates[index][1], input);
		console.log("Generating: " + filename);
		fs.writeFileSync("./output/"+filename, result, 'utf-8', function(err) {
			if(err) {
				console.log("Error saving "+filename+" -> "+err);
				process.exit(1);
			}
		}); 	
	}
}

function rmdir(pathDir) {
    var files = [];
    if(fs.existsSync(pathDir)) {
        files = fs.readdirSync(pathDir);
        files.forEach(function(file,index){
            var curPath = pathDir + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                rmdir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(pathDir);
    }
};


function extractPaths(pathStr){
	let path = pathStr.split("/");
	let paths = [];
	let dir = "";
	for(let i = 0; i < path.length; i++){		
		if(path[i]){
			dir += "/"+path[i];
			paths.push(dir);
		}
	}
	return paths;
}
