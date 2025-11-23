import * as ec from './elemChecks.js';

export const ElemChecksMap = new Map([
    ['img', ec.imgCheck], 
    ['div', ec.divCheck], 
    ['span', ec.spanCheck],
    ['figure', ec.figureCheck],
    ['video', ec.videoCheck],
    ['object', ec.objectCheck], 
    ['audio', ec.audioCheck], 
    ['canvas', ec.canvasCheck],
    ['form', ec.formCheck],
    ['input', ec.inputCheck],
    ['textarea', ec.textareaCheck],
    ['button', ec.buttonCheck],
    ['select', ec.selectCheck],
    ['option', ec.optionCheck],
    ['fieldset', ec.fieldsetCheck],
    ['progress', ec.progressCheck], 
    ['embed', ec.embedCheck],
    ['iframe', ec.iframeCheck],
    ['link', ec.linkCheck],
    ['a', ec.aCheck],
    ['html', ec.htmlCheck]
]);

export const ErrorDescriptionMap = new Map([
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