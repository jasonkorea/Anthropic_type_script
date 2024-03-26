// streaming.ts
import { createModel, createChain, rl } from './common';

async function main() {
  const model = await createModel();
  model.streaming = true; // 스트리밍 옵션 추가

  const chain = await createChain(model);

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
              process.stdout.write(token);
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