class Node {
    constructor(value, child) {
        //non-object value (only JS primitives)
        this.value = value; 
        //array of references to child node objects 
        this.child = child; 
    }
}

//Sample tree; j is root

let a = new Node('a',[]),
    b = new Node('b',[]),
    c = new Node('c',[a,b]),
    d = new Node('d',[]),
    e = new Node('e',[d]),
    f = new Node('f',[c,e]),
    g = new Node('g',[]),
    h = new Node('h',[]),
    l = new Node('l',[]),
    k = new Node('k',[l]),
    i = new Node('i',[h,k]),
    j = new Node('j',[i,g,f]);

//three arguments: root node of tree, value to search for in tree, unseen array (third argument should be omitted when using API)
function depthFirstSerach(node, searchValue, unseen = []) { 
        
    //uncomment to check order of nodes is what is expected in depth-first search
    console.log(node.value); 
    
    //check if current node value is the search value
    //doesn't work if node value is an object reference. need to add additional functionality. 
    if (node.value === searchValue) {
        return searchValue; 
    } else {
        //if the node has child node(s)...
        if (node.child.length) {
            //if more than one child node, save a reference to each additional node in left-to-right order to the front of the unseen array
            //e.g. child notes == [a,b,c] ==> unseen = [b,c,...]
            if (node.child.length > 1) node.child.slice(1).reverse().forEach(n => unseen.unshift(n)); 
            
            //continue searching tree another level down
            return depthFirstSerach(node.child[0], searchValue, unseen); 
            
            //if we've reached a leaf in the tree with no child node...continue the process with the most recently saved node in 'unseen'
        } else if (unseen.length) {
            return depthFirstSerach(unseen[0], searchValue, unseen.slice(1));
            
            //if value not found in tree, return undefined
        } else {
            return undefined; 
        }
    }
}



