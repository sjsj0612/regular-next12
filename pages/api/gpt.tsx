import { NextApiHandler } from 'next';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json({ response: 'GET Method를 호출하였습니다.' })
    }

    if (req.method === 'POST') {
        if (!configuration.apiKey) {
            return new Response('OpenAI API key not configured', {
                status: 500,
            });
        }

        const request = req.body;
        const question = request.question;

        console.log('question', question)
        if (!question) {
            return new Response('question not exist', {
                status: 500,
            });
        }

        const gptResponse = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: question,
            temperature: 1,
            max_tokens: 3000,
        });
        res.status(200).json({ response: gptResponse.data.choices[0].text })
    }
}

export default handler;
