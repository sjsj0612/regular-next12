import { NextApiHandler } from 'next';
import AWS from 'aws-sdk';
import csv from 'csvtojson';

const BUCKET_NAME = 'puzzle-insight-data';
const S3 = new AWS.S3({
    accessKeyId : 'AKIAUIBTOFOYCZBJHAEE',
    secretAccessKey : '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'
})

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const { fileName } = req.query;
        console.log('fileName', fileName)
        const params = {
            Bucket : BUCKET_NAME,
            Key : typeof fileName === 'string' ? `${fileName}.csv` : 'example_2304.csv'
        }

        // get csv file and create stream
        const stream = S3.getObject(params).createReadStream();

        // convert csv file (stream) to JSON format data
        const json = await csv().fromStream(stream);
        // console.log({ data : json })
        res.status(200).json({ data: json })
    }  
    if (req.method === 'POST') {
        const { fileName } = req.body;
        const params = {
            Bucket : BUCKET_NAME,
            Key : fileName
        }

        // get csv file and create stream
        const stream = S3.getObject(params).createReadStream();

        // convert csv file (stream) to JSON format data
        const json = await csv().fromStream(stream);
        // console.log({ data : json })
        res.status(200).json({ data: json })
    } 
};

export default handler;