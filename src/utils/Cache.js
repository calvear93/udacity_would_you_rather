import NodeCache from 'node-cache';

export default new NodeCache({ stdTTL: 30, checkperiod: 120 });
