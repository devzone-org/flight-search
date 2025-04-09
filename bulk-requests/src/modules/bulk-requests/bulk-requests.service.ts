import { Injectable } from '@nestjs/common';
import { CreateBulkRequestDto } from './dto/create-bulk-request.dto';
import { UpdateBulkRequestDto } from './dto/update-bulk-request.dto';
import axios from 'axios';
import { KuwaitService } from '../kuwait/kuwait.service';
import { error } from 'console';
import { PiaService } from '../pia/pia.service';
import { EithadService } from '../eithad/eithad.service';
import { DubaiService } from '../dubai/dubai.service';
import { BlueService } from '../blue/blue.service';
import { Observable } from 'rxjs';
import { from as fromObservable} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class BulkRequestsService {
  constructor(
    private kuwaitService: KuwaitService,
    private PIAService: PiaService,
    private EithadService: EithadService,
    private BlueService: BlueService,
    private DubaiService: DubaiService,
  ) {}
  create(createBulkRequestDto: CreateBulkRequestDto) {
    return 'This action adds a new bulkRequest';
  }

  findAll() {
    return `This action returns all bulkRequests`;
  }
  async *matchingServicesGenerator(from: string, to: string) {
    const matchingAirlines: any[] = [];

    const kuwaitMatches = this.kuwaitService.searchByFromTo(from, to);
    if (kuwaitMatches.length > 0) matchingAirlines.push(...kuwaitMatches);

    const DubaiMatches = this.DubaiService.searchByFromTo(from, to);
    if (DubaiMatches.length > 0) matchingAirlines.push(...DubaiMatches);

    const PIAMatches = this.PIAService.searchByFromTo(from, to);
    if (PIAMatches.length > 0) matchingAirlines.push(...PIAMatches);

    const EithadMatches = this.EithadService.searchByFromTo(from, to);
    if (EithadMatches.length > 0) matchingAirlines.push(...EithadMatches);

    const BlueMatches = this.BlueService.searchByFromTo(from, to);
    if (BlueMatches.length > 0) matchingAirlines.push(...BlueMatches);
    if (matchingAirlines.length === 0) {
      yield { data: { error: 'No records found' } };
      return; 
    }
    for (const item of matchingAirlines) {
      const startTime = Date.now();
      const sleepTime = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
      await this.sleep(sleepTime);

      try {
        const response = await axios.get(item.api);
        const responseTime = Date.now() - startTime;
        yield {
          data: {
            source: item.name,
            sleepTime,
            responseTime,
            apiFetchTime: responseTime - sleepTime,
            apiResponse: response.data,
          }
        };
      } catch (error) {
        const responseTime = Date.now() - startTime;
        yield {
          data: {
            source: item.name,
            sleepTime,
            responseTime,
            apiResponse: { error: error.message },
          }
        };
      }
    }
  }

  matchingServicesSSE(from: string, to: string): Observable<any> {
    return fromObservable(this.matchingServicesGenerator(from, to));
  }
  //sending whole response at one time
  // async matchingServices(from: string, to: string) {
  //   const matchingAirlines: any[] = [];
    
  //   const kuwaitMatches = this.kuwaitService.searchByFromTo(from, to);
  //   if (kuwaitMatches.length > 0) matchingAirlines.push(...kuwaitMatches);
  
  //   const DubaiMatches = this.DubaiService.searchByFromTo(from, to);
  //   if (DubaiMatches.length > 0) matchingAirlines.push(...DubaiMatches);
  
  //   const PIAMatches = this.PIAService.searchByFromTo(from, to);
  //   if (PIAMatches.length > 0) matchingAirlines.push(...PIAMatches);
  
  //   const EithadMatches = this.EithadService.searchByFromTo(from, to);
  //   if (EithadMatches.length > 0) matchingAirlines.push(...EithadMatches);
  
  //   const BlueMatches = this.BlueService.searchByFromTo(from, to);
  //   if (BlueMatches.length > 0) matchingAirlines.push(...BlueMatches);
  
  //   const apiResponses = await Promise.all(
  //     matchingAirlines.map(async (item) => {
  //       const startTime = Date.now();
  //       const sleepTime = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  
  //       await this.sleep(sleepTime); 
  
  //       try {
  //         const response = await axios.get(item.api);
  //         const responseTime = Date.now() - startTime;
  
  //         return {
  //           source: item.name,
  //           sleepTime,
  //           responseTime,
  //           apiFetchTime: responseTime - sleepTime,
  //           apiResponse: response.data,
  //         };
  //       } catch (error) {
  //         const responseTime = Date.now() - startTime;
  
  //         return {
  //           source: item.name,
  //           sleepTime,
  //           responseTime,
  //           apiResponse: { error: error.message },
  //         };
  //       }
  //     })
  //   );
  
  //   return apiResponses;
  // }
  
  
  async findOne(id: string): Promise<{id: string; responseTime: number; sleepTime: number; apiResponse: object}> {
    const startTime = Date.now();
    const sleepTime = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    try {
      await this.sleep(sleepTime);

       const apiResponse = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);      

      const responseTime = Date.now() - startTime;
      
    
      return {
        id,
        sleepTime,
        responseTime,
        apiResponse: apiResponse.data, 
      }
    } catch (error) {
      return {
        id,
        sleepTime,
        responseTime: Date.now() - startTime,
        apiResponse: { error: 'Failed to fetch data from the fake API' },
      }
    }
  }
  private sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  update(id: number, updateBulkRequestDto: UpdateBulkRequestDto) {
    return `This action updates a #${id} bulkRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulkRequest`;
  }
}
