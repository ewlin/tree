//NODE DATA STRUCTURE CONSTRUCTOR
function GraphNode (value, child) {

    //non-object value (only JS primitives)
    this.value = value;
    
    //array of references to child GraphNode objects
    this.child = child;
}


//version that can deal with corrupted trees and circular references. 
function depthFirstSearch (node, searchValue, unseen = [], seen = []) {
        
    //check if child nodes of current node were already seen, and if so, exclude; only an issue in 'corrupt' trees, where a node has multiple parents. 
    let filteredChilds = node.child.filter(n => seen.indexOf(n) == -1), 
        filteredUnseen, 
        traversedVals;

    //add current node to 'seen' array
    seen.push(node); 

    //a stringified list of nodes already traversed 
    traversedVals = seen.map(n => n.value).join(','); 
    
    //update/filter the unseen list. Unnecessary in normal trees; useful in corrupt trees or graphs with cycles/circular references since nodes maybe children to more than one parent and get pushed into the unseen array. Avoids unnecessarily visiting a node more than once and infinite loops
    filteredUnseen = unseen.filter(n => seen.indexOf(n) == -1);

    //check if current node value is the search value
    //doesn't work if node value is an object reference. need to add additional functionality.
    if (node.value === searchValue) {
        return {value: searchValue, traversed: traversedVals}; 
        
    } else {
        
        //if the node has child node(s)...
        if (filteredChilds.length) {
            if (filteredChilds.length > 1) filteredChilds.slice(1).reverse().forEach(n => unseen.unshift(n));
            
            //continue searching tree another level down
            return depthFirstSearch(filteredChilds[0], searchValue, unseen, seen);

        //if we've reached a leaf in the tree with no child node...continue the process with the most recently saved node in 'unseen'
        } else if (filteredUnseen.length) {
            //alternative form:             
            //return depthFirstSearch(filteredUnseen.shift(), searchValue, filteredUnseen, seen);
            return depthFirstSearch(filteredUnseen[0], searchValue, filteredUnseen.slice(1), seen);

        //if value not found in graph, return undefined
        } else {
            return {value: undefined, traversed: traversedVals};
        }
    }
}



//Added a breadth-first search function, since we didn't get to it; also can deal with circular references and corrupt trees


function breadthFirstSearch (node, searchValue) {
    let nextNodes = [],
        seenNodes = [], 
        currentNode = node,
        traversedVals;
    

    while (currentNode) {
        seenNodes.push(currentNode);
        traversedVals = seenNodes.map(n => n.value).join(','); 
        if (currentNode.value === searchValue) {
            return {value: searchValue, traversed: traversedVals}; 
        } else {
            if (currentNode.child.length) {
                currentNode.child.forEach(function(n) {
                    if (seenNodes.indexOf(n) == -1 && nextNodes.indexOf(n) == -1) nextNodes.push(n); 
                });
            }
            currentNode = nextNodes.shift();
        }
    }

    return {value: undefined, traversed: traversedVals}; 
}







