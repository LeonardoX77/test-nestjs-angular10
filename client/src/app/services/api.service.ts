

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class HttpService {

    constructor(public http: HttpClient) { }

    get<T>(url: string, params: Object = null): Observable<T> {

        const urlParts = url.split('/');

        if (urlParts[0] === 'assets') {
            return this.http.get<T>(url);
        } else {

            if (params) { url = this.concatQueryParams(url, params); }
            return this.http.get<T>(url, { headers: this.getHeaders() });
        }
    }

    getLocal(url: string): Observable<any> {
        return this.http.get(url);
    }

    postJSon(url: string, body: any, params: Object = null): Observable<any> {
        if (params) { url = this.concatQueryParams(url, params); }
        return this.http.post(url, JSON.stringify(body), { headers: this.getHeaders('post') });
    }

    postForm(url: string, body: any, params: Object = null): Observable<any> {
        if (params) { url = this.concatQueryParams(url, params); }
        return this.http.post(url, body, { headers: this.getHeaders('post', false) });
    }

    put(url: any, body: any, params: Object = null) {
        if (params) { url = this.concatQueryParams(url, params); }
        return this.http.put(url, JSON.stringify(body), { headers: this.getHeaders('put') });
    }

    delete(url: any, body: any = '', params: Object = null) {

        if (params) { url = this.concatQueryParams(url, params); }
        return this.http.delete(url, { headers: this.getHeaders('delete') });
    }

    private getHeaders(action: string = null, isJson: boolean = true) {
        let headers = new HttpHeaders();

        headers = headers.set('Access-Control-Allow-Origin', 'Content-Type, x-xsrf-token');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Cache-Control', 'no-cache');
        headers = headers.set('Pragma', 'no-cache'); // For internet explorer/older versions of IIS

        if (action === 'post' || action === 'put') {
            headers = headers.set('Content-Type', isJson ? 'application/json' : 'application/x-www-form-urlencoded');
            headers = headers.set('Audience', 'Any');
        }

        return headers;
    }

    private concatQueryParams(url: string, params: Object): string {
        url += '?';
        const keys: string[] = Object.keys(params);
        keys.forEach((param, i) => {
            url += param + '=' + encodeURIComponent(params[param]);
            if (i < keys.length - 1) { url += '&'; }
        });

        return url;
    }

}
