import { RulesMap } from "./rulesMap"

const result = {
    url: location.href,
    generalResult: {
        totalChecks: 0,
        successfulChecks: 0,
        failChecks: 0
    },
    failsDescription: []
}

treeBypass(document, doc)

function treeBypass(node, path){
    
    //tagName возвращается в верхнем регистре div => DIV
    const fails = RulesMap.get(node.tagName).map(rule => rule(node));

    result.generalResult.totalChecks += RulesMap.get(node.tagName).length;
    result.generalResult.failChecks += fails.length;
    result.generalResult.successfulChecks += RulesMap.get(node.tagName).length - fails.length;

    result.failsDescription.push(
        {
            idElement: node.hasAttribute("id") ? node.id : null,
            //позже доделаю
            pathElement: null,
            occuredErrors: fails
        }
    )

    for(child of node.children){
        if(!(child.hasAttribute("aria-hidden") && child.hasAttribute("aria-hidden") === true))
            treeBypass(child);
    };
}