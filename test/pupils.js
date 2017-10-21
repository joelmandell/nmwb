import {tester***REMOVED*** from 'graphql-tester'
import chai from 'chai'
import assert from 'assert'

const test = tester({
	url:'http://127.0.0.1:4000/graphql/'	
***REMOVED***)

test('{pupils { id,firstName,lastName ***REMOVED*** ***REMOVED***').then( (response) => {
	console.log("Testing pupils")
	console.log("=====================")
	assert.equal(response.data.pupils[0].firstName,'Kerstin')
	console.log("Passed test	OK!")
	console.log("=====================")

***REMOVED***)
