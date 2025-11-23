(function () {
    function treeBypass(
        node, 
        path = '', 
        result = {
            url: location.href,
            generalResult: {
                totalChecks: 0,
                successfulChecks: 0,
                failChecks: 0
            },
            failsDescription: []
        }
    ) {
        const tagName = node.tagName.toLowerCase();
        const fullPath = window.buildNodePath(node, tagName, path);

        if (window.ElemChecksMap.has(tagName)) {
            const checkFunc = window.ElemChecksMap.get(tagName); 
    
            const fail = checkFunc(node);
            const isFail = fail && fail.length > 0;
    
            result.generalResult.totalChecks += 1;
            result.generalResult.failChecks += isFail ? 1 : 0;
            result.generalResult.successfulChecks += isFail ? 0 : 1;
    
            result.failsDescription.push(
                {
                    idElement: node.hasAttribute("id") ? node.id : null,
                    pathElement: path,
                    occuredErrors: fail
                }
            )
        }


        for(child of node.children){
            if(!(child.hasAttribute("aria-hidden") && child.getAttribute("aria-hidden") === true))
                treeBypass(child, fullPath, result);
        };

        return result;
    }

    window.treeBypass = treeBypass;
})();

window.buildNodePath = function(node, tagName, path) {
    const childs = node.parentNode 
        ? Array.from(node.parentNode.children).filter(n => tagName === n.tagName.toLowerCase()) 
        : [];

    const index = node.parentNode ? childs.indexOf(node) + 1 : 1;
    const segment = `${tagName}[${index}]`;
    
    return path ? `${path}/${segment}` : `/${segment}`;
    
}

window.treeBypass = treeBypass;