import readline from 'readline';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';

marked.setOptions({
  renderer: new TerminalRenderer(),
  mangle: false,
  headerIds: false,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.input.setEncoding('utf8'); 

let isChatting = false;

async function sendMessage(message) {
  try {
    const spinner = ora(chalk.blue('Sending message to AI...')).start();

    const response = await axios.post('https://xxxxx', {
      prompt: message
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    spinner.stop();

    const aiResponse = response.data.response?.response || "No data returned.";
    console.log(chalk.green("AI Response:"));

    if (aiResponse) {
      console.log(marked(aiResponse));
    }

  } catch (error) {
    console.error(chalk.red("Request failed:"), error.message);
  }
}

function startConversation() {
  console.log(chalk.yellow("Conversation started. Please enter your message..."));
  chatLoop();
}

function chatLoop() {
  if (isChatting) {
    rl.question(chalk.cyan('You: '), (message) => {
      if (message.toLowerCase() === '@stop') {
        console.log(chalk.yellow("Conversation ended."));
        isChatting = false;
        rl.close();
        process.exit();
        return;
      }

      sendMessage(message).then(() => {
        chatLoop();
      });
    });
  }
}

isChatting = true;
startConversation();
