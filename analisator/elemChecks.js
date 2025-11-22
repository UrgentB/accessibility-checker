import { ErrorDescriptionMap } from "./rulesMap";
import * as rc from "./rulesChecks";

function imgCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'alt') || 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null
    } else {
        return ErrorDescriptionMap[1];
    }
}

function divCheck(node) {
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
        return ErrorDescriptionMap[2];
    }
}

function spanCheck(node) {
    if (rc.hasAttributeExpectedValueCheck(node, 'role', 'img') && 
        (
            rc.attrNoneNullValueCheck(node, 'aria-label') || 
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[3];
    }
}

function figureCheck(node) {
    if (rc.innerChildTextContentCheck(node, 'figcaption')) {
        return null;
    } else {
        return ErrorDescriptionMap[4];
    }
}

function videoCheck(node) {
    if (
        rc.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[5];
    }
}

function objectCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[6];
    }
}

function audioCheck(node) {
    if (
        rc.innerChildHaveAttrCheck(node, 'track', 'kind') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[7];
    }
}

function canvasCheck(node) {
    if (
        rc.textContentNoneNullValueCheck(node) && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[8];
    }
}

function formCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[9];
    }
}

function inputCheck(node) {
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
        return ErrorDescriptionMap[10];
    }
}

function textareaCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[11];
    }
}

function buttonCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaLabelledByCheck(node)
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[12];
    }
}

function selectCheck(node) {
    if ((
            rc.attrNoneNullValueCheck(node, 'aria-label') || 
            rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
        )
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[13];
    }
}

function optionCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[14];
    }
}

function fieldsetCheck(node) {
    if (
        rc.innerChildExistCheck(node, 'legend') && 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[15];
    }
}

function progressCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[16];
    }
}

function embedCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby') || 
        rc.ariaRelatedElementsCheck(node, 'aria-describedby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[17];
    }
}

function iframeCheck(node) {
    if (
        rc.hasAttributeValue(node, 'title') && 
        rc.hasAttributeExpectedValueCheck(node, 'sandbox', 'allow-same-origin allow-scripts allow-top-navigation') &&
        rc.haveAnyContentCheck(node) || 
        rc.attrNoneNullValueCheck(node, 'aria-label') ||
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[18];
    }
}

function linkCheck(node) {
    if (
        rc.hasAttributeValue(node, 'title') || 
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[19];
    }
}

function aCheck(node) {
    if (
        rc.attrNoneNullValueCheck(node, 'aria-label') || 
        rc.ariaRelatedElementsCheck(node, 'aria-labelledby')
    ) {
        return null;
    } else {
        return ErrorDescriptionMap[20];
    }
}

function htmlCheck(node) {
    const head = node.querySelector('head');
    if (!head) {
        return ErrorDescriptionMap[24];
    }

    const title = head.querySelector('title');
    if (!title) {
        return ErrorDescriptionMap[24];
    }

    const text = title.textContent?.trim();
    if (!text) {
        return ErrorDescriptionMap[24];
    }
    
    if (
        !rc.attrNoneNullValueCheck(node, 'lang')
    ) {
        return ErrorDescriptionMap[26];
    }

    return null;
}
