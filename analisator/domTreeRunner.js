const ElemChecksMap = new Map([
    ['img', imgCheck], 
    ['div', divCheck], 
    ['span', spanCheck],
    ['figure', figureCheck],
    ['video', videoCheck],
    ['object', objectCheck], 
    ['audio', audioCheck], 
    ['canvas', canvasCheck],
    ['form', formCheck],
    ['input', inputCheck],
    ['textarea', textareaCheck],
    ['button', buttonCheck],
    ['select', selectCheck],
    ['option', optionCheck],
    ['fieldset', fieldsetCheck],
    ['progress', progressCheck], 
    ['embed', embedCheck],
    ['iframe', iframeCheck],
    ['link', linkCheck],
    ['a', aCheck],
    ['html', htmlCheck]
]);

const ErrorDescriptionMap = new Map([
    [1, {
        description: 'Тег <img> не информативен',
        wcagReq: '1.1.1'
    }],
    [2, {
        description: "Тег <div> с role = 'img' не информативен",
        wcagReq: '1.1.1'
    }],
    [3, {
        description: 'Тег <span> не информативен',
        wcagReq: '1.1.1'
    }],
    [4, {
        description: 'Тег <figure> не информативен',
        wcagReq: '1.1.1'
    }],
    [5, {
        description: 'Тег <video> не информативен',
        wcagReq: '1.1.1'
    }],
    [6, {
        description: 'Тег <object> не информативен',
        wcagReq: '1.1.1'
    }],
    [7, {
        description: 'Тег <audio> не информативен',
        wcagReq: '1.1.1'
    }],
    [8, {
        description: 'Тег <canvas> не информативен',
        wcagReq: '1.1.1'
    }],
    [9, {
        description: 'Тег <form> не информативен',
        wcagReq: '1.1.1'
    }],
    [10, {
        description: 'Тег <input> не информативен',
        wcagReq: '1.1.1'
    }],
    [11, {
        description: 'Тег <textarea> не информативен',
        wcagReq: '1.1.1'
    }],
    [12, {
        description: 'Тег <button> не информативен',
        wcagReq: '1.1.1'
    }],
    [13, {
        description: 'Тег <select> не информативен',
        wcagReq: '1.1.1'
    }],
    [14, {
        description: 'Тег <option> не информативен',
        wcagReq: '1.1.1'
    }],
    [15, {
        description: 'Тег <fieldset> не информативен',
        wcagReq: '1.1.1'
    }],
    [16, {
        description: 'Тег <progress> не информативен',
        wcagReq: '1.1.1'
    }],
    [17, {
        description: 'Тег <embed> не информативен',
        wcagReq: '1.1.1'
    }],
    [18, {
        description: 'Тег <iframe> не информативен',
        wcagReq: '1.1.1'
    }],
    [19, {
        description: 'Тег <link> не информативен',
        wcagReq: '1.1.1'
    }],
    [20, {
        description: 'Тег <a> не информативен',
        wcagReq: '1.1.1'
    }],
    [21, {
        description: "Тег <div> с role = 'heading' не содержит уровень заголовка",
        wcagReq: '1.3.1'
    }],
    [22, {
        description: 'Тег <video> содержит autoplay',
        wcagReq: '1.4.2'
    }],
    [23, {
        description: 'Тег <audio> содержит autoplay',
        wcagReq: '1.4.2'
    }],
    [24, {
        description: 'У HTML-документа не информативный title',
        wcagReq: '2.4.2'
    }],
    [25, {
        description: "Тег <input> c type = 'rang' не информативен",
        wcagReq: '2.5.1'
    }],
    [26, {
        description: 'Тег <html> не информативен',
        wcagReq: '3.1.1'
    }],
    [27, {
        description: 'Тег <input> в <form> с required не информативен',
        wcagReq: '3.3.1'
    }],
    [28, {
        description: 'Тег <textarea> в <form> с required не информативен',
        wcagReq: '3.3.1'
    }],
    [29, {
        description: 'Тег <select> в <form> с required не информативен',
        wcagReq: '3.3.1'
    }],
    [30, {
        description: 'Тег <input> не имеет атрибутов автозаполнения',
        wcagReq: '3.3.7'
    }],
]);

const result = {
    url: location.href,
    generalResult: {
        totalChecks: 0,
        successfulChecks: 0,
        failChecks: 0
    },
    failsDescription: []
}

function buildNodePath(node, tagName, path) {
    const childs = node.parentNode 
        ? Array.from(node.parentNode.children).filter(n => tagName === n.tagName.toLowerCase()) 
        : [];

    const index = node.parentNode ? childs.indexOf(node) + 1 : 1;
    const segment = `${tagName}[${index}]`;
    
    return path ? `${path}/${segment}` : `/${segment}`;
    
}

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
        const fullPath = buildNodePath(node, tagName, path);

        if (ElemChecksMap.has(tagName)) {
            const checkFunc = ElemChecksMap.get(tagName); 
    
            
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

function ariaRelatedElementsCheck(node, attributeName) {
    const attr = node.getAttribute(attributeName);

    if (!attr || attr.trim() === "") {
        return false;
    }

    const labelledElement = document.getElementById(attr);

    if (!labelledElement || !textContentNoneNullValueCheck(labelledElement)) {
        return false;
    } else {
        return true;
    }
}

function attrNoneNullValueCheck(node, attrName) {
    if (!node.hasAttribute(attrName) || !node.getAttribute(attrName).trim()) {
        return false;
    } else {
        return true;
    }
}

function innerChildTextContentCheck(node, innerChildSelector) {
    const innerChild = node.querySelector(innerChildSelector);

    if (!innerChild) return false;
    
    return textContentNoneNullValueCheck(innerChild);
}

function textContentNoneNullValueCheck(node) {
    if (
        !node.textContent ||
        node.textContent.replace(/\s+/g, '').trim().length === 0
    ) {
        return false;
    } else {
        return true;
    }
}

function roleCheck(node) {
    if (!node.hasAttribute('aria-label') || node.getAttribute('aria-label').trim() === '') {
        return false
    } 

    if (!node.hasAttribute('role') || node.getAttribute('aria-label').trim() === 'img') {
        return false
    }  

    return true
}

function innerChildHaveAttrCheck(node, innerChildSelector, attrName) {
    const caption = node.querySelector(innerChildSelector);

    if (!caption) return false;
    
    if (!node.hasAttribute(attrName) || node.getAttribute(attrName).trim() === '') {
        return false;
    } else {
        return true;
    }
}

function innerChildExistCheck(node, innerChildSelector) {
    if (!node.querySelector(innerChildSelector)) return false;
    return true;
}

function hasAttributeExpectedValueCheck(node, attributeName, value) {
    if (!node.hasAttribute(attributeName)) return false;

    const attr = node.getAttribute(attributeName);
    if (attr !== value) return false
    return true
}

// Recheck
function haveAnyContentCheck(node) {
    let hasContent = false;

    const walker = (node) => {
        if (n === node) hasContent = false;

        if (n.nodeType === Node.TEXT_NODE) {
            const text = n.textContent.trim();
            if (text.length > 0) {
                hasText = true;
            }
        }

        if (n.nodeType === Node.ELEMENT_NODE) {
            hasNonText = true;
        }

        return NodeFilter.FILTER_SKIP;
    }    

    walker(node);
    return hasContent;
} 

function hasTitleCheck() {
    const head = document.head;
    if (!head) return false;

    const title = head.querySelector('title');
    return !!title && !!title.textContent.trim();
}

function inputAttributesCheck(node) {
    if (node.getAttribute("type") !== "range") return false;

    const attrs = ["min", "max", "value", "step"];

    for (const attr of attrs) {
        const v = node.getAttribute(attr);

        if (v === null || v.trim() === "" || Number(v) === 0) return false;
    }

    return true;
}

function checkRequiredAria(node) {
    return node.tagName?.toLowerCase() !== "input"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

function checkTextareaRequired(node) {
    return node.tagName?.toLowerCase() !== "textarea"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

function checkSelectRequired(node) {
    return node.tagName?.toLowerCase() !== "select"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

function checkInputNameAndAutocomplete(node) {
    if (node.tagName?.toLowerCase() !== "input") return true;

    const name = node.getAttribute("name");
    const ac = node.getAttribute("autocomplete");

    if (!name || !name.trim()) return false;
    if (!ac || !ac.trim()) return false;

    return true;
}

function checkDivAriaLevel(node) {
    if (!node || node.tagName?.toLowerCase() !== 'div') return true;

    const role = node.getAttribute('role');
    if (role !== 'header') return true;

    const ariaLevel = node.getAttribute('aria-level');
    if (!ariaLevel || ariaLevel.trim() === '' || Number(ariaLevel) === 0) {
        console.warn('<div role="header"> без aria-level или с некорректным значением:', node);
        return false;
    }

    return true;
}

function buildError(id) {
    const error = ErrorDescriptionMap.get(id);
    return {
        idError: id,
        descriptionError: error.description,
        WCAGrequirement: error.wcagReq
    }
}

function imgCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'alt') || 
        attrNoneNullValueCheck(node, 'aria-label') ||
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null
    } else {
        return buildError(1);
    }
}

function divCheck(node) {
    if (hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            attrNoneNullValueCheck(node, 'aria-label') ||
            ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) || (
            hasAttributeExpectedValueCheck(node, 'role', 'header') &&
            attrNoneNullValueCheck(node, 'aria-level')
        )
    ) {
        return null;
    } else {
        return buildError(2);
    }
}

function spanCheck(node) {
    if (hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            attrNoneNullValueCheck(node, 'aria-label') || 
            ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(3);
    }
}

function figureCheck(node) {
    if (innerChildTextContentCheck(node, 'figcaption')) {
        return null;
    } else {
        return buildError(4);
    }
}

function videoCheck(node) {
    if (
        innerChildHaveAttrCheck(node, 'track', 'kind') && 
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(5);
    }
}

function objectCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') ||
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(6);
    }
}

function audioCheck(node) {
    if (
        innerChildHaveAttrCheck(node, 'track', 'kind') && 
        attrNoneNullValueCheck(node, 'aria-label') ||
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(7);
    }
}

function canvasCheck(node) {
    if (
        textContentNoneNullValueCheck(node) && 
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(8);
    }
}

function formCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(9);
    }
}

function inputCheck(node) {
    if ((
            attrNoneNullValueCheck(node, 'aria-label') || 
            ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) && (
            attrNoneNullValueCheck(node, 'name') &&
            attrNoneNullValueCheck(node, 'autocomplete')
        )
    ) {
        return null;
    } else {
        return buildError(10);
    }
}

function textareaCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(11);
    }
}

function buttonCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(12);
    }
}

function selectCheck(node) {
    if ((
            attrNoneNullValueCheck(node, 'aria-label') || 
            ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(13);
    }
}

function optionCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(14);
    }
}

function fieldsetCheck(node) {
    if (
        innerChildExistCheck(node, 'legend') && 
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(15);
    }
}

function progressCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(16);
    }
}

function embedCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(17);
    }
}

function iframeCheck(node) {
    if (
        node.hasAttribute('title') && 
        hasAttributeExpectedValueCheck(node, 'sandbox', 'allow-same-origin allow-scripts allow-top-navigation') &&
        haveAnyContentCheck(node) || 
        attrNoneNullValueCheck(node, 'aria-label') ||
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(18);
    }
}

function linkCheck(node) {
    if (
        node.hasAttribute('title') || 
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(19);
    }
}

function aCheck(node) {
    if (
        attrNoneNullValueCheck(node, 'aria-label') || 
        ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(20);
    }
}

function htmlCheck(node) {
    const head = node.querySelector('head');
    if (!head) {
        return buildError(24);
    }

    const title = head.querySelector('title');
    if (!title) {
        return buildError(24);
    }

    const text = title.textContent?.trim();
    if (!text) {
        return buildError(24);
    }
    
    if (
        !attrNoneNullValueCheck(node, 'lang')
    ) {
        return buildError(26);
    }

    return null;
}

window.treeBypass = treeBypass;