// async.ts
import { createModel, createChain, rl } from './common';

async function main() {
  const model = await createModel();
  const chain = await createChain(model);

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