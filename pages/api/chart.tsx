import { NextApiHandler } from 'next';
import { createCanvas } from 'canvas';
import { VictoryChart, VictoryBar } from 'victory';

interface ChartData {
  labels: string[];
  data: number[];
}

const handler: NextApiHandler<ChartData> = async (req, res) => {

    if (req.method === 'POST') {
    // Process a POST request

      const data = req.body;
      console.log('data', data)
      const canvas = createCanvas(800, 600);
      const chart = (
        <VictoryChart
          width={800}
          height={600}
          domainPadding={30}
        >
        <VictoryBar
            data={data.labels.map((label:string, index:number) => ({
            x: label,
            y: data.data[index]
            }))}
        />
        </VictoryChart>
      );

      const ReactDOMServer = (await import('react-dom/server')).default
      const svgString = ReactDOMServer.renderToString(chart);
      
      res.writeHead(200, {
        // 'Content-Type': 'image/svg+xml;charset=utf-8',
        'Content-Type': 'text/xml;charset=utf-8',
      });
      res.end(svgString);
    }
};

export default handler;