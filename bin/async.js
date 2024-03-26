"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// async.ts
const common_1 = require("./common");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const model = yield (0, common_1.createModel)();
        const chain = yield (0, common_1.createChain)(model);
        function promptUser() {
            return __awaiter(this, void 0, void 0, function* () {
                common_1.rl.question('User: ', (input) => __awaiter(this, void 0, void 0, function* () {
                    if (input.toLowerCase() === 'exit') {
                        common_1.rl.close();
                        return;
                    }
                    const response = yield chain.call({ input });
                    console.log('Assistant:', response.response);
                    promptUser();
                }));
            });
        }
        console.log('대화를 시작합니다. 종료하려면 "exit"을 입력하세요.');
        promptUser();
    });
}
main();
