# **Cloudflare-AI-Application**

## What's this ?

​    This is a terminal application that you can run interactive ai in your own computer  terminal, which requires you have follow prerequisites. 

## Prerequisite 

- **Cluodflare workers**

  Register an account in [Cloudflare](https://www.cloudflare.com) then head to tag `Workers and Pages` and enable it.

- **Node js** 

  Require you computer have a node js env.

## How to use it ?

- `git clone https://github.com/Alexander-Bruce/cloudflare-ai-terminal.git`
- **Deploy Workers**
  - `cd clodflare/ai`
  - `npm install`
  - `npx wrangler login`
  - `npx wrangler deploy`
- **Run interactive terminal** 
  - `cd interactive-terminal`
  - `vim index.js`
  - Replace the following URL  `https://xxxxxx/` with your own page's
  - `npm install` 
  - `npm start`

