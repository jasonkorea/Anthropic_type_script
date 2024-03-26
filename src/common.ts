// common.ts
import * as dotenv from 'dotenv';
import { Configurations } from './claude_configurations';
import { ChatAnthropic } from '@langchain/anthropic';
import { ConversationChain } from 'langchain/chains';
import * as readline from 'readline';

export const ANTHROPIC_API_KEY = process.env['ANTHROPIC_API_KEY'];
dotenv.config();

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function createModel() {
  return new ChatAnthropic({
    temperature: Configurations.temperature,
    modelName: "claude-3-opus-20240229",
    anthropicApiKey: ANTHROPIC_API_KEY,
    maxTokens: Configurations.maxTokens,
  });
}

export async function createChain(model : any) {
  return new ConversationChain({ llm: model });
}