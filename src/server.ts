import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { formater } from './services/text';
import { IncomingWebhook } from '@slack/webhook';

dotenv.config();

const app: Express = express();
const url = process.env.SLACK_WEBHOOK_URL as string;
const webhook = new IncomingWebhook(url);

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello World',
    author: "Adryan Alencar <adryan.alencar@sevenfox.com.br>"
  });
});

app.post("/newsletter", (request: Request, response: Response) => {
    // get raw body
    const body = request.body;
    const news = formater(body)

    webhook.send(news)

    response.send({
        news
    });    
})

var listener = app.listen(Number(process.env.PORT || 8080), () => {
  console.log(`⚡️[server]: Server is running.`);
});