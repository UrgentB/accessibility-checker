import { ElemChecksMap } from "./rulesMap"

const result = {
    url: location.href,
    generalResult: {
        totalChecks: 0,
        successfulChecks: 0,
        failChecks: 0
    },
    failsDescription: []
}

export function treeBypass(node, path){
    const tagName = node.tagName.toLowerCase();
    const checks = ElemChecksMap.get(tagName); 
    
    //tagName возвращается в верхнем регистре div => DIV
    const fail = checks.map(rule => rule(node)).filter(res => res);
    const isFail = fail.length > 0;

    result.generalResult.totalChecks += 1;
    result.generalResult.failChecks += isFail ? 1 : 0;
    result.generalResult.successfulChecks += isFail ? 0 : 1;

    result.failsDescription.push(
        {
            idElement: node.hasAttribute("id") ? node.id : null,
            //позже доделаю
            pathElement: path,
            occuredErrors: fail
        }
    )

    for(child of node.children){
        if(!(child.hasAttribute("aria-hidden") && child.getAttribute("aria-hidden") === true))
            treeBypass(child);
    };
}