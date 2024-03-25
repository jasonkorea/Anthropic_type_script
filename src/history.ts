// create a chat history storage static singleton object
export class History {
    static history: any[] = [];
    static add (message : any) {
        this.history.push(message);
    }
    static get() {
        return this.history;
    }

    static printHistory() {
        console.log(JSON.stringify(this.history, null, 2));
    }
};