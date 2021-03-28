var recipes = require("./recipes.json");
var know = require("./cookbook.json");

var fs = require("fs");
var path = require("path");
var Mustache = require("./js/mustache.js");

var faker = require("./js/faker.js");


filedata = fs.readFileSync('./js/pluralize.js','utf8');
var plural = eval(filedata);

var v = require('./js/voca.js');


function addTools(input){
	let date = new Date();
	var counter = 0;

	input["timestamp"] = date.getTime();
	input["date"] = date.toISOString().split('T')[0];
	input["time"] = date.toISOString().split('T')[1].split('.')[0]
	input["year"] = date.getFullYear();
	input["month"] = ("00"+(date.getMonth()+1)).slice(-2);
	input["day"] = ("00"+date.getDate()).slice(-2);
	input["hour"] = ("00"+date.getHours()).slice(-2);
	input["minute"] = ("00"+date.getMinutes()).slice(-2);
	input["second"] = ("00"+date.getSeconds()).slice(-2);

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
	input["slug"] = functionToTagAfterRender(v.slugify);
	input["reverse"] = functionToTagAfterRender(v.reverse);

	input["count"] = functionToTagAfterRender(v.count);
	input["countWords"] = functionToTagAfterRender(v.countWords);

	input["stripTags"] = functionToTagAfterRender(v.stripTags);
	input["escHtml"] = functionToTagAfterRender(v.escapeHtml);
	input["unHtml"] = functionToTagAfterRender(v.unescapeHtml);
	input["escRegExp"] = functionToTagAfterRender(v.escapeRegExp);
	input["trim"] = functionToTagAfterRender(v.trim);
	input["latin"] = functionToTagAfterRender(v.latinise);

	input["delSpaces"] = functionToTagAfterRender(delSpaces);
	input["delDuplicateSpaces"] = functionToTagAfterRender(delDuplicateSpaces);
	input["delLast"] = functionToTagAfterRender(delLast);
	input["delFirst"] = functionToTagAfterRender(delFirst);
	input["delEnd"] = functionToTagAfterRender(delEnd);
	input["delStart"] = functionToTagAfterRender(delStart);

	input["repeat"] = functionToTagBeforeRender(repeat);

	input["delEmptyL"] = functionToTagAfterRender(delEmptyL);
	input["sortAscL"] = functionToTagAfterRender(sortAscL);
	input["sortDescL"] = functionToTagAfterRender(sortDescL);
	input["naturalSortAscL"] = functionToTagAfterRender(naturalSortAscL);
	input["naturalSortDescL"] = functionToTagAfterRender(naturalSortDescL);	
	input["shuffleL"] = functionToTagAfterRender(shuffleL);
	input["trimL"] = functionToTagAfterRender(trimL);
	input["joinL"] = functionToTagAfterRender(joinL);	
	input["delDuplicateL"] = functionToTagAfterRender(delDuplicateL);
	input["spaceL"] = functionToTagAfterRender(spaceL);
	input["tabL"] = functionToTagAfterRender(tabL);
	input["addStartL"] = functionToTagAfterRender(addStartL);
	input["addEndL"] = functionToTagAfterRender(addEndL);

	input["log"] = functionToTagAfterRender(log);

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

	input["C="] = functionToTagAfterRender(resetCounter);
	input["C+"] = functionToTagAfterRender(incCounter);
	input["C-"] = functionToTagAfterRender(decCounter);
	input["C"] = functionToTagAfterRender(writeCounter);

	input["faker"] = functionToTagAfterRender(fakerFunction);

	input["eval"] = functionToTagAfterRender(evalFunction);
}

function fakerFunction(text){
	return eval("faker."+text+"()");	
}

function evalFunction(text){
	return eval(text);	
}

function resetCounter(text, params){	
	params = params | 0;
	counter = params;
	return text;
}

function incCounter(text, params){
	params = params | 1;
	counter += params;
	return text;
	
}

function decCounter(text, params){
	params = params | 1;
	counter -= params;
	return render(text);	
}

function writeCounter(text){	
	return counter+""+text;	
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

function naturalSortAscL(text){
	let lines = getLines(text);
    lines.sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
    return joinLines(lines);
}

function naturalSortDescL(text){
	let lines = getLines(text);
    lines.sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
    return joinLines(lines);
}

function shuffleL(){
	let lines = getLines(text);
	for (let i = lines.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[lines[i], lines[j]] = [lines[j], lines[i]];
	}
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

function delDuplicateL(text){
	let lines = getLines(text);
	Array.from(new Set(lines)).join("\n");
}

function delEmptyL(text){
	let lines = getLines(text);
	return lines.filter((item, i, allItems) => {
		return item.trim() !== "";
	}).join("\n")+"\n";
}

function spaceL(text){	
	let lines = getLines(text);
	let prefix = "";
	for(let i = 0; i < param; i++){
		prefix += " ";
	}
	lines = lines.map(x => prefix+x.trim());
	return joinLines(lines);
}

function tabL(text, param){	
	let lines = getLines(text);
	let prefix = "";
	for(let i = 0; i < param; i++){
		prefix += "\t";
	}
	lines = lines.map(x => prefix+x.trim());
	return joinLines(lines);
}

function delLast(text, param){
	let index;
	index = text.lastIndexOf(param);
	if(index > -1){
		text = text.slice(0, index)+""+text.substring(index+param.length);
	}

	return text;
}

function delFirst(text, param){
	let index;
	index = text.indexOf(param);
	if(index > -1){
		text = text.slice(0, index)+""+text.substring(index+param.length);
	}

	return text;
}

function delEnd(text, param){
	return text.slice(0, -param);
}

function delStart(text, param){
	return text.substring(param);
}

function addStartL(text, params){	
	let lines = getLines(text);
	lines = lines.map(x => params+""+x);
	return joinLines(lines);
}

function addEndL(text, params){	
	let lines = getLines(text);
	lines = lines.map(x => x+""+params);
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

function repeat(text, param){
	let result = "";
	for(let i = param; i > 0; i--){	
		result += ""+text;
	}
	return result 
}

function log(text){
	console.log(text);
}


function functionToTagAfterRender(f){
	return function () {
		return function (text, render, param) {
			return f(render(text), param)
		};
	}
}

function functionToTagBeforeRender(f){
	return function () {
		return function (text, render, param) {
			return render(f(text, param))
		};
	}
}


Mustache.escape = function(text) {return text;};


console.log("Del output");
rmdir("./output/");

console.log("Creating dir: output");
fs.mkdirSync("./output");

for(recipeIndex in recipes){
	var recipe = recipes[recipeIndex];

	addTools(recipe);

	var step = [];
	var vars = [];
	var templates = [];
	var directories = [];
	var dirs = [];
	var paths = [];

	for(index in recipe.steps){	
		step = require("./steps/"+ recipe.steps[index]+".json");
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
		recipe[vars[index][0]] = Mustache.render(vars[index][1], recipe);	
	}

	for (index in dirs) {
		directories = directories.concat(extractPaths(Mustache.render(dirs[index], recipe)));
	}

	for (index in directories) {
		if (!fs.existsSync("./output/"+directories[index])) {
			console.log("Creating dir: "+directories[index]); 
			fs.mkdirSync("./output/"+directories[index]);
		}
	}

	for (index in templates){	
		var file = fs.readFileSync("./templates/"+templates[index][0], "utf8");
		var filename = Mustache.render(templates[index][1], recipe);
		console.log("Generating: " + filename);
		var render = Mustache.render(file, recipe);
		fs.writeFileSync("./output/"+filename, render, 'utf-8', function(err) {
			if(err) {
				console.log("Error saving "+filename+" -> "+err);
				process.exit(1);
			}
		}); 
	}

}

console.log("Bon Appetite!!!");

return;
//END


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
