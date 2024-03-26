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
    static printHistory() {
        console.log(JSON.stringify(this.history, null, 2));
    }
}
exports.History = History;
History.history = [];
;
