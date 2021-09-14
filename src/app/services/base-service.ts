import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { KeyValuePair } from "../definitions/key-value-pair";
import { Constants } from '../definitions/constants';

@Injectable()
export class BaseApiService {

    private readonly httpGet: string = "GET";
    private readonly httpPut: string = "PUT";
    private readonly httpPost: string = "POST";
    private readonly httpDelete: string = "DELETE";

    public constructor(private http: HttpClient) { }

    private getUrl(resource: string): string {
      return Constants.apiBaseUrl + resource;
  }

    public get(resource: string, queryParameters?: KeyValuePair[]): Observable<any> {
        const fullUrl: string = this.getUrl(resource);
        const options: any = this.getOptions(this.httpGet, queryParameters);
        return this.http.get(fullUrl, options);
    }

    public post(resource: string, queryParameters: KeyValuePair[], model: any): Observable<any> {
        const fullUrl: string = this.getUrl(resource);
        const options = this.getOptions(this.httpPost, queryParameters);
        return this.http.post(fullUrl, JSON.stringify(model), options);
    }

    public postDownloadFile(resource: string, queryParameters: KeyValuePair[], model: any): Observable<any> {
        const fullUrl: string = this.getUrl(resource);
        const options = this.getOptions(this.httpPost, queryParameters, "blob");
        return this.http.post(fullUrl, JSON.stringify(model), options);
    }

    public put(resource: string, queryParameters: KeyValuePair[], model: any): Observable<any> {
        const fullUrl: string = this.getUrl(resource);
        const options = this.getOptions(this.httpPut, queryParameters);
        return this.http.put(fullUrl, JSON.stringify(model), options);
    }

    public delete(resource: string, queryParameters: KeyValuePair[]): Observable<any> {
        const fullUrl: string = this.getUrl(resource);
        const options = this.getOptions(this.httpDelete, queryParameters);
        return this.http.delete(fullUrl, options);
    }

    private getOptions(httpVerb: string, queryParameters: KeyValuePair[], rt = "json"): any {
        const options: any = {};
        options.headers = this.getRequestHeaders(httpVerb);
        options.params = this.getRequestParams(queryParameters);
        options.responseType = rt;
        return options;
    }

    private getRequestHeaders(httpVerb: string): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        if (httpVerb === this.httpGet) {
            headers = headers.set('Accept', 'application/json');
        } else if (httpVerb === this.httpPut) {
            headers = headers.set('Content-Type', 'application/json');
        } else if (httpVerb === this.httpPost) {
            headers = headers.set('Content-Type', 'application/json');
        } else if (httpVerb === this.httpDelete) {
            headers = headers.set('Content-Type', 'application/json');
        }
        return headers;
    }

    private getRequestParams(queryParameters: KeyValuePair[]): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        if (queryParameters && queryParameters.length > 0) {
            for (const kvp of queryParameters) {
                if (Array.isArray(kvp.Value)) {
                    if (kvp.Value.length > 0) {
                        httpParams = httpParams.append(kvp.Key, kvp.Value.join(","));
                    }
                } else {
                    httpParams = httpParams.append(kvp.Key, kvp.Value);
                }
            }
        }
        return httpParams;
    }
}
