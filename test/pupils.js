import {tester} from 'graphql-tester'
import chai from 'chai'
import assert from 'assert'

const test = tester({
	url:'http://127.0.0.1:4000/graphql/'	
})

test('{pupils { id,firstName,lastName } }').then( (response) => {
	console.log("Testing pupils")
	console.log("=====================")
	assert.equal(response.data.pupils[0].firstName,'Kerstin')
	console.log("Passed test	OK!")
	console.log("=====================")

})
