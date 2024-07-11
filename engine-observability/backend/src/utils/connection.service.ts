import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import * as net from 'net';

@Injectable()
export class ConnectionService {
  async testConnection(host: string, port: number): Promise<boolean> {
    const url = `http://${host}:${port}`;
    try {
      const response = await axios.get(url, { timeout: 3000 });
      return response.status === 200;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        console.error(`Connection to ${url} timed out.`);
      } else {
        console.error(`Failed to connect to ${url}:`, error.message);
      }
      return false;
    }
  }
}
