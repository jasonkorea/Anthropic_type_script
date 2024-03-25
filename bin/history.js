"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
// create a chat history storage static singleton object
class History {
    static add(message) {
        this.history.push(message);
    }
    static get() {
        return this.history;
    }
}
exports.History = History;
History.history = [];
;
