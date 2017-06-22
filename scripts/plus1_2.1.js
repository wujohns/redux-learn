/**
 * 原版 redux 中的一些技巧
 *
 * @author wujohns
 * @date 17/6/22
 */
'use strict';

let currentListeners = [];
let nextListeners = currentListeners;

const ensureCanMutateNextListeners = () => {
    if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
    }
}

const dispatch = () => {
    const listeners = currentListeners = nextListeners;
    for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        listener();
    }
};

const subscribe = (listener) => {
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
};

const dosub = () => {
    console.log('------ do sub -----------');
    subscribe(dosub);
};
dosub();
dispatch();