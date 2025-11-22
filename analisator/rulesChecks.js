export function ariaRelatedElementsCheck(node, attributeName) {
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

export function attrNoneNullValueCheck(node, attrName) {
    if (!node.hasAttribute(attrName) || !node.getAttribute(attrName).trim()) {
        return false;
    } else {
        return true;
    }
}

export function innerChildTextContentCheck(node, innerChildSelector) {
    const innerChild = node.querySelector(innerChildSelector);

    if (!innerChild) return false;
    
    return textContentNoneNullValueCheck(innerChild);
}

export function textContentNoneNullValueCheck(node) {
    if (
        !node.textContent ||
        node.textContent.replace(/\s+/g, '').trim().length === 0
    ) {
        return false;
    } else {
        return true;
    }
}

export function roleCheck(node) {
    if (!node.hasAttribute('aria-label') || node.getAttribute('aria-label').trim() === '') {
        return false
    } 

    if (!node.hasAttribute('role') || node.getAttribute('aria-label').trim() === 'img') {
        return false
    }  

    return true
}

export function innerChildHaveAttrCheck(node, innerChildSelector, attrName) {
    const caption = node.querySelector(innerChildSelector);

    if (!caption) return false;
    
    if (!node.hasAttribute(attrName) || node.getAttribute(attrName).trim() === '') {
        return false;
    } else {
        return true;
    }
}

export function innerChildExistCheck(node, innerChildSelector) {
    if (!node.querySelector(innerChildSelector)) return false;
    return true;
}

export function hasAttributeExpectedValueCheck(node, attributeName, value) {
    if (!node.hasAttribute(attributeName)) return false;

    const attr = node.getAttribute(attributeName);
    if (attr !== value) return false
    return true
}

// Recheck
export function haveAnyContentCheck(node) {
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

export function hasTitleCheck() {
    const head = document.head;
    if (!head) return false;

    const title = head.querySelector('title');
    return !!title && !!title.textContent.trim();
}

export function inputAttributesCheck(node) {
    if (node.getAttribute("type") !== "range") return false;

    const attrs = ["min", "max", "value", "step"];

    for (const attr of attrs) {
        const v = node.getAttribute(attr);

        if (v === null || v.trim() === "" || Number(v) === 0) return false;
    }

    return true;
}

export function checkRequiredAria(node) {
    return node.tagName?.toLowerCase() !== "input"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

export function checkTextareaRequired(node) {
    return node.tagName?.toLowerCase() !== "textarea"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

export function checkSelectRequired(node) {
    return node.tagName?.toLowerCase() !== "select"
        || !node.closest("form")
        || !node.hasAttribute("required")
        || node.getAttribute("aria-required") === "true";
}

export function checkInputNameAndAutocomplete(node) {
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
