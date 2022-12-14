import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async searchFromRedis(keyword: string) {
    let finalResult = null;
    const res = await fetch(`http://35.213.167.63/redis/${keyword}`);
    const result = await res.json();

    result.detail === 'Not Found' ? (finalResult = {}) : (finalResult = result);

    return finalResult;
  }
}
