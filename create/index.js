#!/bin/env node

var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');

var templateDir = path.join(__dirname, '../templates/');
var moduleDir = path.join(__dirname, '../dist/');

var name = process.argv.splice(2, 3)[0];
var dashed = name.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2');
var lowerdashed = dashed.toLowerCase();

var distFolder = path.join(moduleDir, lowerdashed, 'dist');

fs.mkdirs(distFolder, function(err, data) {
	if(err) {
		console.error(chalk.red('Couldn\'t create folder(s) for ' + name));
	}
	
	var mpath = path.join(distFolder, lowerdashed) + '.html';
	var spath = path.join(distFolder, lowerdashed) + '.js';
	
	fs.copy(path.join(templateDir, 'racks-component.html'), mpath, function(err, d) {
		if(err) {
			console.error(chalk.red('Couldn\'t copy to ' + mpath));
		}
		
		fs.readFile(mpath, function(err, data) {
			if(err) {
				console.error(chalk.red(err.message));
			}
			
			console.log('Creating your Markup component');
			
			data = data.toString();
			var res = data.replace(/racks-component/g, lowerdashed);
			fs.writeFile(mpath, res, 'utf8', function() {
				console.log(chalk.cyan('Markup component created'));
			});
		});
	});
	
	fs.copy(path.join(templateDir, 'racks-component.js'), spath, function(err, d) {
		if(err) {
			console.error(chalk.red('Couldn\'t copy to ' + spath));
		}
		
		fs.readFile(spath, function(err, data) {
			if(err) {
				console.error(chalk.red(err.message));
			}
			
			console.log('Creating your Prototype and ShadowDOM');
			
			data = data.toString();
			var res = data.replace(/RacksComponent/g, name);
			fs.writeFile(spath, res, 'utf8', function() {
				if(err) {
					console.error(chalk.red(err.message));
				}
				console.log(chalk.cyan('Prototype and ShadowDOM created'));
			});
		});
	});
	
});