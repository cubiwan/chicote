# chicote

Agnostic template engine code generator

(Chicote is a famous Spanish chef)

Chicote need NodeJS to work. Use [mustache.js](https://github.com/janl/mustache.js), [pluralize](https://github.com/plurals/pluralize) and [voca](https://github.com/panzerdp/voca). You don't need install anything, only download code and call cooking.js

```
node cooking.js
```

You need create a recipe.json, recipe contains all ingredients and steps. 

* Ingredient is any value in json. Ingredients are accesible from templates.
* Steps are an array with name "steps". Steps are json files in Step directory

Example of recipe.json

```javascript
{	
    "name": "Test",
	"author": "Bob",
	"fields": [
		{"name": "id", "type": "int"},
		{"name": "firstname", "type": "String"},
		{"name": "lastname", "type": "String"},
		{"name": "birthday", "type": "date"}
	],
	"names": ["HelloWorld", "helloWorld", "hello-world"],
	"steps": ["example"]
}
```

Steps are where you prepare ingredients. One step have three parts: vars, directories, templates
* vars are variables creates from ingredients. Work similar to ingredients
* directories indicates directories to output
* templates, files in template directory 

Example of step
```javascript
{
    "vars":[
        ["filename1", "exampleA-{{timestamp}}.code"],
        ["filename2", "exampleB-{{timestamp}}.code"],
        ["className", "{{#capital}}{{name}}{{/capital}}"],
        ["varName", "{{#decapital}}{{name}}{{/decapital}}"],
        ["moduleName", "{{#dash}}{{name}}Module{{/dash}}"]
    ],	
    "directories":[
        "example/example1",
        "example/example2",
        "examples/example1/example2"
    ],
    "templates":[
        ["example/example1.text", "text.txt"],
        ["example/example1.text", "example/example1/{{filename1}}"],
        ["example/example2.text", "example/example2/{{filename2}}"],
        ["example/example1.text", "examples/example1/{{filename1}}"],
        ["example/example2.text", "examples/example1/example2/{{filename2}}"]
    ]
}
```
