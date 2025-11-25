window.buildError = function(id) {
    const error = window.ErrorDescriptionMap.get(id);
    return {
        idError: id,
        descriptionError: error.description,
        WCAGrequirement: error.wcagReq
    }
}

window.imgCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'alt') || 
        window.attrNoneNullValueCheck(node, 'aria-label') ||
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null
    } else {
        return buildError(1);
    }
}

window.divCheck = function(node) {
    if (window.hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            window.attrNoneNullValueCheck(node, 'aria-label') ||
            window.ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) || (
            window.hasAttributeExpectedValueCheck(node, 'role', 'header') &&
            window.attrNoneNullValueCheck(node, 'aria-level')
        )
    ) {
        return null;
    } else {
        return buildError(2);
    }
}

window.spanCheck = function(node) {
    if (window.hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            window.attrNoneNullValueCheck(node, 'aria-label') || 
            window.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(3);
    }
}

window.figureCheck = function(node) {
    if (window.innerChildTextContentCheck(node, 'figcaption')) {
        return null;
    } else {
        return buildError(4);
    }
}

window.videoCheck = function(node) {
    if (
        window.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(5);
    }
}

window.objectCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') ||
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(6);
    }
}

window.audioCheck = function(node) {
    if (
        window.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        window.attrNoneNullValueCheck(node, 'aria-label') ||
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(7);
    }
}

window.canvasCheck = function(node) {
    if (
        window.textContentNoneNullValueCheck(node) && 
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(8);
    }
}

window.formCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(9);
    }
}

window.inputCheck = function(node) {
    if ((
            window.attrNoneNullValueCheck(node, 'aria-label') || 
            window.ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) && (
            window.attrNoneNullValueCheck(node, 'name') &&
            window.attrNoneNullValueCheck(node, 'autocomplete')
        )
    ) {
        return null;
    } else {
        return buildError(10);
    }
}

window.textareaCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(11);
    }
}

window.buttonCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(12);
    }
}

window.selectCheck = function(node) {
    if ((
            window.attrNoneNullValueCheck(node, 'aria-label') || 
            window.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(13);
    }
}

window.optionCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(14);
    }
}

window.fieldsetCheck = function(node) {
    if (
        window.innewindowhildExistCheck(node, 'legend') && 
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(15);
    }
}

window.progressCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(16);
    }
}

window.embedCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        window.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(17);
    }
}

window.iframeCheck = function(node) {
    if (
        node.hasAttribute('title') && 
        window.hasAttributeExpectedValueCheck(node, 'sandbox', 'allow-same-origin allow-scripts allow-top-navigation') &&
        window.haveAnyContentCheck(node) || 
        window.attrNoneNullValueCheck(node, 'aria-label') ||
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(18);
    }
}

window.linkCheck = function(node) {
    if (
        node.hasAttribute('title') || 
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(19);
    }
}

window.aCheck = function(node) {
    if (
        window.attrNoneNullValueCheck(node, 'aria-label') || 
        window.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(20);
    }
}

window.htmlCheck = function(node) { 
    if (
        !window.attrNoneNullValueCheck(node, 'lang')
    ) {
        return buildError(26);
    }

    return null;
}

window.headCheck = function(node) {
    const title = node.querySelector('title');
    if (!title) {
        return buildError(24);
    }

    const text = title.textContent?.trim();
    if (!text) {
        return buildError(24);
    }
    
    return null;
}
