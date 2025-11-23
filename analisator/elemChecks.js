import { ErrorDescriptionMap } from "./rulesMap.js";
import * as rc from "./rulesChecks.js";

function buildError(id) {
    const error = ErrorDescriptionMap[id];
    return {
        idError: id,
        descriptionError: error.description,
        WCAGrequirement: error.wcagReq
    }
}

export function imgCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'alt') || 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null
    } else {
        return buildError(1);
    }
}

export function divCheck(node) {
    if (rc.hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            rc.attrNoneNullValueCheck(node, 'aria-label') ||
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) || (
            rc.hasAttributeExpectedValueCheck(node, 'role', 'header') &&
            rc.attrNoneNullValueCheck(node, 'aria-level')
        )
    ) {
        return null;
    } else {
        return buildError(2);
    }
}

export function spanCheck(node) {
    if (rc.hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            rc.attrNoneNullValueCheck(node, 'aria-label') || 
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(3);
    }
}

export function figureCheck(node) {
    if (rc.innerChildTextContentCheck(node, 'figcaption')) {
        return null;
    } else {
        return buildError(4);
    }
}

export function videoCheck(node) {
    if (
        rc.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(5);
    }
}

export function objectCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(6);
    }
}

export function audioCheck(node) {
    if (
        rc.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(7);
    }
}

export function canvasCheck(node) {
    if (
        rc.textContentNoneNullValueCheck(node) && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(8);
    }
}

export function formCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(9);
    }
}

export function inputCheck(node) {
    if ((
            rc.attrNoneNullValueCheck(node, 'aria-label') || 
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        ) && (
            rc.attrNoneNullValueCheck(node, 'name') &&
            rc.attrNoneNullValueCheck(node, 'autocomplete')
        )
    ) {
        return null;
    } else {
        return buildError(10);
    }
}

export function textareaCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(11);
    }
}

export function buttonCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaLabelledByCheck(node)
    ) {
        return null;
    } else {
        return buildError(12);
    }
}

export function selectCheck(node) {
    if ((
            rc.attrNoneNullValueCheck(node, 'aria-label') || 
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return buildError(13);
    }
}

export function optionCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(14);
    }
}

export function fieldsetCheck(node) {
    if (
        rc.innerChildExistCheck(node, 'legend') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(15);
    }
}

export function progressCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(16);
    }
}

export function embedCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return buildError(17);
    }
}

export function iframeCheck(node) {
    if (
        rc.hasAttributeValue(node, 'title') && 
        rc.hasAttributeExpectedValueCheck(node, 'sandbox', 'allow-same-origin allow-scripts allow-top-navigation') &&
        rc.haveAnyContentCheck(node) || 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(18);
    }
}

export function linkCheck(node) {
    if (
        rc.hasAttributeValue(node, 'title') || 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(19);
    }
}

export function aCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return buildError(20);
    }
}

export function htmlCheck(node) {
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
        !rc.attrNoneNullValueCheck(node, 'lang')
    ) {
        return buildError(26);
    }

    return null;
}
