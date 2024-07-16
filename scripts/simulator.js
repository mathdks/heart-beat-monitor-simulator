// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

let firstCreated = false;
let count = 0;
let tryIrregular = true;

socket.on('connect', () => {
  console.log('Conexão estabelecida');

  setInterval(() => {
    const measurement = generateMeasurement();
    count++;
    socket.emit('createMeasurement', measurement);
  }, 100);
});

socket.on('alert', (message) => {
  console.log(`Alerta recebido: ${message}`);
  tryIrregular = !tryIrregular;
});

const generateMeasurement = () => {
  const timestamp = new Date();

  const baselineValue = baseline(timestamp);

  if (!firstCreated) {
    firstCreated = true;
    console.log('Primeira medição com data de 31 dias atrás');

    return {
      value: baselineValue,
      timestamp: new Date(timestamp.getTime() - 31 * 24 * 60 * 60 * 1000),
    };
  }

  console.log('Medição:', count);

  return {
    value: tryIrregular ? baselineValue * 1.5 : baselineValue,
    timestamp: timestamp,
  };
};

const baseline = (timestamp) => {
  const miliseconds = new Date(timestamp).getTime();

  const step1 = -0.06366;
  const step2 = 0.12613 * Math.cos(miliseconds / 500);
  const step3 = 0.12258 * Math.cos(miliseconds / 250);
  const step4 = 0.01593 * Math.sin(miliseconds / 500);
  const step5 = 0.03147 * Math.sin(miliseconds / 250);

  return step1 + step2 + step3 + step4 + step5;
};
