import * as dotenv from 'dotenv';
import { Configurations } from './claude_configurations';
import { ChatAnthropic } from '@langchain/anthropic';
import { ConversationChain } from 'langchain/chains';
import * as readline from 'readline';

const ANTHROPIC_API_KEY = process.env['ANTHROPIC_API_KEY'];
dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    const model = new ChatAnthropic({
        temperature: Configurations.temperature,
        modelName: "claude-3-opus-20240229",
        anthropicApiKey: ANTHROPIC_API_KEY,
        maxTokens: Configurations.maxTokens,
        streaming: true, // 스트리밍 옵션 추가
    });

    const chain = new ConversationChain({ llm: model });

    async function promptUser() {
        rl.question('User: ', async (input) => {
            if (input.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            console.log('Assistant:');
            let isFirstToken = true;
            const response = await chain.call(
                { input },
                [
                    {
                        handleLLMNewToken(token: string) {
                            if (isFirstToken) {
                                isFirstToken = false;
                            }
                            process.stdout.write(token); // 스트리밍된 토큰을 실시간으로 출력
                        },
                    },
                ]
            );

            console.log('\n');
            promptUser();
        });
    }

    console.log('대화를 시작합니다. 종료하려면 "exit"을 입력하세요.');
    promptUser();
}

main();