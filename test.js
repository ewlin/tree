///Test tools
///Barebones testing tool: 

var testResults = {total: 0, passed: 0, failed: 0}
function assertEquals (actual, expected, message = "") {
    testResults.total += 1; 
    console.log("TEST #" + testResults.total + ": " + message + ":"); 
    console.log("Expected: " + expected); 
    
    if (actual === expected) {
        console.log("Got: " + actual);
        console.log("Test PASSED.")
        testResults.passed += 1; 
    } else {
        console.log("Got: " + actual + " instead.");
        console.log("Test FAILED.")
        testResults.failed += 1;
    }
}







//Test cases: 


//Graph 1--with cycles/circular references--i.e. n3 is a child node of n1 but n1 is also a child node of n3; depth-first search should ignore nodes it has already seen 

var n6 = new GraphNode('6',[]),
    n5 = new GraphNode('5',[]),
    n3 = new GraphNode('3',[]),
    n4 = new GraphNode('4',[n5]),
    n2 = new GraphNode('2',[n4,n5]),
    n1 = new GraphNode('1',[n2,n3]);

n3.child = [n1,n6]; //update child property independently of initiation of object to avoid referencing an uninitiated variable reference to non-existent node 


//assertions for graph with circular references
console.log("TESTING SEARCH IN GRAPH WITH CIRCULAR REFERENCES:");
assertEquals(depthFirstSearch(n1,'6').value, '6', 'Searching for 6 should return value of 6'); 
assertEquals(depthFirstSearch(n1,'6').traversed, '1,2,4,5,3,6', 'Should return the correct depth-first search order and NOT include deplicate nodes');
assertEquals(depthFirstSearch(n1,'7').value, undefined, 'Should return undefined when searching for value not in graph'); 



//Graph 2--corrupt tree, where some nodes have multiple parents 

var g1 = new GraphNode('g',[]),
    h1 = new GraphNode('h',[]),
    d1 = new GraphNode('d',[]),
    i1 = new GraphNode('i',[]),
    j1 = new GraphNode('j',[]),
    b1 = new GraphNode('b',[d1]),
    e1 = new GraphNode('e',[d1,g1]),
    a1 = new GraphNode('a',[i1,e1,j1]),
    c1 = new GraphNode('c',[a1,b1]),
    f1 = new GraphNode('f',[c1,e1,h1]);


//assertions for corrupt tree, where nodes may have more than one parent node 
console.log("TESTING SEARCH IN TREES WITH NODES THAT HAVE MULTIPLE PARENT NODES:");
assertEquals(depthFirstSearch(f1,'j').value, 'j', 'Searching for j should return value of j'); 
assertEquals(depthFirstSearch(f1,'h').value, 'h', 'Searching for h should return value of h'); 
assertEquals(depthFirstSearch(f1,'h').traversed, 'f,c,a,i,e,d,g,j,b,h', 'Should return the correct depth-first search order of nodes and NOT include deplicate nodes'); 
assertEquals(depthFirstSearch(f1,'e').traversed, 'f,c,a,i,e', 'Should return the correct depth-first search order of nodes and NOT include deplicate nodes');
assertEquals(depthFirstSearch(f1,'k').value, undefined, 'Should return undefined when searching for value not in graph'); 



//Graph 3--simple tree--all nodes either have 0 (root node) or 1 parent node at most

var a = new GraphNode('a',[]),
    b = new GraphNode('b',[]),
    c = new GraphNode('c',[a,b]),
    d = new GraphNode('d',[]),
    e = new GraphNode('e',[d]),
    f = new GraphNode('f',[c,e]),
    g = new GraphNode('g',[]),
    h = new GraphNode('h',[]),
    l = new GraphNode('l',[]),
    k = new GraphNode('k',[l]),
    i = new GraphNode('i',[h,k]),
    j = new GraphNode('j',[i,g,f]);


//assertions for simple tree
console.log("TESTING SEARCH IN REGULAR TREE STRUCTURES SHOULD WORK:");
assertEquals(depthFirstSearch(j,'d').value, 'd', 'Searching for d should return value of d');
assertEquals(depthFirstSearch(j,'d').traversed, 'j,i,h,k,l,g,f,c,a,b,e,d', 'Should return correct order of visited nodes for depth-first search'); 
assertEquals(depthFirstSearch(j,'m').value, undefined, 'Should return undefined when searching for value not in graph'); 



//breadth-first tests
console.log("TESTING BREADTH-FIRST SEARCH FUNCTION:"); 
assertEquals(breadthFirstSearch(n1,'6').traversed, '1,2,3,4,5,6', 'Should return the correct breadth-first search order and NOT include deplicate nodes');
assertEquals(breadthFirstSearch(f1,'j').traversed, 'f,c,e,h,a,b,d,g,i,j', 'Should return the correct breadth-first search order and NOT include deplicate nodes');
assertEquals(breadthFirstSearch(j,'d').traversed, 'j,i,g,f,h,k,c,e,l,a,b,d', 'Should return the correct breadth-first search order for normal trees');
assertEquals(breadthFirstSearch(f1,'k').value, undefined, 'Should return undefined when searching for value not in corrupt tree'); 
assertEquals(breadthFirstSearch(n1,'7').value, undefined, 'Should return undefined when searching for value not in graph'); 
assertEquals(breadthFirstSearch(j,'z').value, undefined, 'Should return undefined when searching for value not in tree'); 
assertEquals(breadthFirstSearch(j,'z').traversed, 'j,i,g,f,h,k,c,e,l,a,b,d', 'Should still visit nodes in correct order when searching for value not in tree'); 
assertEquals(breadthFirstSearch(n1,'7').traversed, '1,2,3,4,5,6', 'Should visit nodes in correct order when searching for value not in graph + NOT revisit nodes with multiple parent nodes');
assertEquals(breadthFirstSearch(f1,'x').traversed, 'f,c,e,h,a,b,d,g,i,j', 'Should visit nodes in correct order when searching for value not in graph + NOT revisit nodes with multiple parent nodes');




console.log("Total tests: " + testResults.total);
console.log("Total tests passed: " + testResults.passed);
console.log("Total tests failed: " + testResults.failed);



