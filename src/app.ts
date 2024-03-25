import * as dotenv from 'dotenv';
import { Configurations } from './claude_configurations';

import { ChatAnthropic } from '@langchain/anthropic';
import { ConversationChain } from 'langchain/chains';

const API_KEY = process.env['ANTHROPIC_API_KEY'];
dotenv.config();

async function main() {
    const model = new ChatAnthropic({
        temperature: 0.9,
        modelName: "claude-3-opus-20240229",
        anthropicApiKey: API_KEY,
        maxTokens: Configurations.maxTokens,
    });

    const chain = new ConversationChain({ llm: model });

    const response1 = await chain.call({ input: "지구는 왜 둥글지?" });
    console.log(response1.response);

    const response2 = await chain.call({ input: "세모 모양이라면 어떤 현상이 일어날까?" });
    console.log(response2.response);
}

main();