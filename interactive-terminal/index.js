import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import axios from 'axios';
import readlineSync from 'readline-sync';  
import chalk from 'chalk';
import ora from 'ora';

marked.setOptions({
  renderer: new TerminalRenderer(),
  mangle: false,     
  headerIds: false,  
});

let isChatting = false;

async function sendMessage(message) {
  try {
    const spinner = ora(chalk.blue('Sending message to AI...')).start();
    
    // replace the url with your own Workers's page
    const response = await axios.post('https://xxxxxx/', {
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
    const message = readlineSync.question(chalk.cyan('You: '));  

    if (message.toLowerCase() === '@stop') {
      console.log(chalk.yellow("Conversation ended."));
      isChatting = false;
      process.exit();  
      return;
    }

    sendMessage(message).then(() => {
      chatLoop();  
    });
  }
}

isChatting = true;
startConversation();
