import { NextApiHandler } from 'next';
import { VictoryChart, VictoryBar } from 'victory';
// import sharp from 'sharp';

interface ChartData {
  labels: string[];
  data: number[];
}

const example = '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
const example2 = `<svg width="800" height="600" role="img" viewBox="0 0 800 600" style="pointer-events:all;width:100%;height:100%"><g role="presentation"><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 58.125, 550 
A 0 0 0 0 1, 58.125, 550 
L 58.125, 304.7296302957961 
A 0 0 0 0 1, 58.125, 304.7296302957961 
L 101.875, 304.7296302957961 
A 0 0 0 0 1, 101.875, 304.7296302957961 
L 101.875, 550 
A 0 0 0 0 1, 101.875, 550 
 z" index="0" role="presentation" shape-rendering="auto"></path><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 186.125, 550 
A 0 0 0 0 1, 186.125, 550 
L 186.125, 161.65524796834382 
A 0 0 0 0 1, 186.125, 161.65524796834382 
L 229.875, 161.65524796834382 
A 0 0 0 0 1, 229.875, 161.65524796834382 
L 229.875, 550 
A 0 0 0 0 1, 229.875, 550 
 z" index="1" role="presentation" shape-rendering="auto"></path><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 314.125, 550 
A 0 0 0 0 1, 314.125, 550 
L 314.125, 488.682407573949 
A 0 0 0 0 1, 314.125, 488.682407573949 
L 357.875, 488.682407573949 
A 0 0 0 0 1, 357.875, 488.682407573949 
L 357.875, 550 
A 0 0 0 0 1, 357.875, 550 
 z" index="2" role="presentation" shape-rendering="auto"></path><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 442.125, 550 
A 0 0 0 0 1, 442.125, 550 
L 442.125, 243.4120378697451 
A 0 0 0 0 1, 442.125, 243.4120378697451 
L 485.875, 243.4120378697451 
A 0 0 0 0 1, 485.875, 243.4120378697451 
L 485.875, 550 
A 0 0 0 0 1, 485.875, 550 
 z" index="3" role="presentation" shape-rendering="auto"></path><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 570.125, 550 
A 0 0 0 0 1, 570.125, 550 
L 570.125, 100.3376555422928 
A 0 0 0 0 1, 570.125, 100.3376555422928 
L 613.875, 100.3376555422928 
A 0 0 0 0 1, 613.875, 100.3376555422928 
L 613.875, 550 
A 0 0 0 0 1, 613.875, 550 
 z" index="4" role="presentation" shape-rendering="auto"></path><path style="fill:#252525;stroke:#252525;padding:8px;stroke-width:0" d="M 698.125, 550 
A 0 0 0 0 1, 698.125, 550 
L 698.125, 79.89845806694247 
A 0 0 0 0 1, 698.125, 79.89845806694247 
L 741.875, 79.89845806694247 
A 0 0 0 0 1, 741.875, 79.89845806694247 
L 741.875, 550 
A 0 0 0 0 1, 741.875, 550 
 z" index="5" role="presentation" shape-rendering="auto"></path></g><g role="presentation"><line vector-effect="non-scaling-stroke" style="stroke:#252525;fill:transparent;stroke-width:1;stroke-linecap:round;stroke-linejoin:round" role="presentation" shape-rendering="auto" x1="50" x2="750" y1="550" y2="550"></line><g role="presentation"><text direction="inherit" dx="0" x="80" y="572.97" id="chart-axis-1-tickLabels-0"><tspan x="80" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Red</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="208" y="572.97" id="chart-axis-1-tickLabels-1"><tspan x="208" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Blue</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="336" y="572.97" id="chart-axis-1-tickLabels-2"><tspan x="336" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Yellow</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="464" y="572.97" id="chart-axis-1-tickLabels-3"><tspan x="464" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Green</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="592" y="572.97" id="chart-axis-1-tickLabels-4"><tspan x="592" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Purple</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="720" y="572.97" id="chart-axis-1-tickLabels-5"><tspan x="720" dx="0" dy="0" text-anchor="middle" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">Orange</tspan></text></g></g><g role="presentation"><line vector-effect="non-scaling-stroke" style="stroke:#252525;fill:transparent;stroke-width:1;stroke-linecap:round;stroke-linejoin:round" role="presentation" shape-rendering="auto" x1="50" x2="50" y1="50" y2="550"></line><g role="presentation"><text direction="inherit" dx="0" x="39" y="452.7740126232484" id="chart-axis-2-tickLabels-0"><tspan x="39" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">5</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="39" y="350.5780252464968" id="chart-axis-2-tickLabels-1"><tspan x="39" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">10</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="39" y="248.3820378697451" id="chart-axis-2-tickLabels-2"><tspan x="39" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">15</tspan></text></g><g role="presentation"><text direction="inherit" dx="0" x="39" y="146.18605049299347" id="chart-axis-2-tickLabels-3"><tspan x="39" dx="0" dy="0" text-anchor="end" style="font-family:&#x27;Gill Sans&#x27;, &#x27;Seravek&#x27;, &#x27;Trebuchet MS&#x27;, sans-serif;font-size:14px;letter-spacing:normal;padding:10px;fill:#252525;stroke:transparent">20</tspan></text></g></g></svg>`
 
const handler: NextApiHandler<ChartData> = async (req, res) => {

    if (req.method === 'POST') {
    // Process a POST request

      const data = req.body;
      console.log('data', data);

      const chart = (
        <VictoryChart
          width={800}
          height={600}
          domainPadding={30}
        >
            <VictoryBar
                data={data.data.labels.map((label:string, index:number) => ({
                x: label,
                y: data.data.data[index]
                }))}
            />
        </VictoryChart>
      );

      const ReactDOMServer = (await import('react-dom/server')).default;
      const svgString = ReactDOMServer.renderToString(chart);
    //   console.log('svgString', svgString);
      const svg = Buffer.from(example2);
      console.log('svg', svg)
      // const png = await sharp(svg)
      //   //.flatten({ background: 'white' })
      //   .png().toBuffer()

      res.writeHead(200, {
        'Content-Type': 'image/png',
      });
      // res.end(png);
    }
};

export default handler;