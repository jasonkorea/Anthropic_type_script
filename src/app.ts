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
    });

    const chain = new ConversationChain({ llm: model });

    async function promptUser() {
        rl.question('User: ', async (input) => {
          if (input.toLowerCase() === 'exit') {
            rl.close();
            return;
          }
    
          const response = await chain.call({ input });
          console.log('Assistant:', response.response);
    
          promptUser();
        });
      }
    
      console.log('대화를 시작합니다. 종료하려면 "exit"을 입력하세요.');
    promptUser();
}

main();