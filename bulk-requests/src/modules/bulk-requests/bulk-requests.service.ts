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
//working for parallel request without loop
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
  
    console.log(matchingAirlines);
  
  
    //1 request for each service
    // const pendingPromises = matchingAirlines.map(async (item) => {
    //   const startTime = Date.now();
    //   const sleepTime = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  
    //   await this.sleep(sleepTime); 
  
    //   try {
    //     const response = await axios.get(item.api);
    //     const responseTime = Date.now() - startTime;
    //     return {
    //       source: item.name,
    //       sleepTime,
    //       responseTime,
    //       apiFetchTime: responseTime - sleepTime,
    //       apiResponse: response.data,
    //     };
    //   } catch (error) {
    //     const responseTime = Date.now() - startTime;
    //     return {
    //       source: item.name,
    //       sleepTime,
    //       responseTime,
    //       apiFetchTime: responseTime - sleepTime,
    //       apiResponse: { error: error.message },
    //     };
    //   }
    // });
  
    //5 requests for each service
    const pendingPromises: Promise<{
      source: any;
      request: number;
      sleepTime: number;
      responseTime: number;
      apiFetchTime: number;
      apiResponse: any;
    }>[] = [];
    
for (const item of matchingAirlines) {
  for (let i = 0; i < 5; i++) { 
    const promise = (async () => {
      const startTime = Date.now();
      const sleepTime = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  
      await this.sleep(sleepTime);
  
      try {
        const response = await axios.get(item.api);
        const responseTime = Date.now() - startTime;
        return {
          source: item.name,
          request: i + 1,
          sleepTime,
          responseTime,
          apiFetchTime: responseTime - sleepTime,
          apiResponse: response.data,
        };
      } catch (error) {
        const responseTime = Date.now() - startTime;
        return {
          source: item.name,
          request: i + 1,
          sleepTime,
          responseTime,
          apiFetchTime: responseTime - sleepTime,
          apiResponse: { error: error.message },
        };
      }
    })();
  
    pendingPromises.push(promise); 
  }
}


    const promisesSet = new Set(pendingPromises);
  
    while (promisesSet.size > 0) {
      const fastest = await Promise.race(promisesSet);
  
      for (const p of promisesSet) {
        p.then((result) => {
          if (result === fastest) {
            promisesSet.delete(p);
          }
        });
      }
  
      yield { data: fastest };
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
