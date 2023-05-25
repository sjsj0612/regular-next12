import { NextApiHandler } from 'next';
import AWS from 'aws-sdk';

const BUCKET_NAME = 'puzzle-insight-data';
const s3 = new AWS.S3({
    accessKeyId : 'AKIAUIBTOFOYCZBJHAEE',
    secretAccessKey : '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'
})


const handler: NextApiHandler = async (req, res) => {

    if (req.method === 'GET') {
        const data = req.body;
        console.log('data', data)
        
        const params = {
            Bucket : BUCKET_NAME,
            Key : 'table-data.csv', //data.file_name,
        }

        s3.getObject(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log('res', data);
            console.log('res-body', data.Body)
        })

        res.status(200).json({ response: '테스트중입니다.' })
    }
};

export default handler;