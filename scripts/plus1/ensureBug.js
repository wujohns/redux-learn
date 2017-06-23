/**
 * 没有 ensureCanMutateNextListeners 时会出现的 bug
 *
 * @author wujohns
 * @date 17/6/22
 */
'use strict';

const listeners = [];

const dispatch = () => {
    for (let i = 0; i < listeners.length; i++) {
        const listener = listeners[i];
        listener();
    }
};

const subscribe = (listener) => {
    listeners.push(listener);
};

const dosub = () => {
    console.log('------ do sub -----------');
    subscribe(dosub);
};
dosub();
dispatch();