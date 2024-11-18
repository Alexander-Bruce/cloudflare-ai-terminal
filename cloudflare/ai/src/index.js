/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
	async fetch(request, env) {
	  if (request.method === 'POST') {
		try {
		  const { prompt } = await request.json();

		  if (!prompt) {
			return new Response('Prompt is required', { status: 400 });
		  }

		  const response = await env.AI.run("@cf/meta/llama-3.1-70b-instruct", {
			prompt: prompt,
		  });

		  return new Response(JSON.stringify({ response: response }), {
			headers: { 'Content-Type': 'application/json' },
		  });
		} catch (error) {
		  console.error('Error:', error);
		  return new Response('Error processing request', { status: 500 });
		}
	  } else if (request.method === 'OPTIONS') {
		return new Response(null, {
		  status: 204,
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		  },
		});
	  } else {
		return new Response('Method Not Allowed', { status: 405 });
	  }
	},
  };






