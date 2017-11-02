#!/usr/bin/env node
'use strict';

const program = require('commander')
const bcrypt = require('bcrypt')
const saltRounds = 15

program
    .version('0.1')
    .command('admin')
    .option('-p, --password','Create password for user admin.')
    .action( (pass) => {
        
        bcrypt.hash(pass, saltRounds, function(err, hash) {
            const fs = require('fs');
            fs.writeFile("ha.js", `***REMOVED*** hash: '${hash***REMOVED***' ***REMOVED***`, function(err) {
                if(err) {
                    return console.log(err);
                ***REMOVED***
            
                console.log("Password generated");
            ***REMOVED***); 
        ***REMOVED***);
    ***REMOVED***)
    
program.parse(process.argv)
