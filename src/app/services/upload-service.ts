import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../definitions/api-response";
import { BaseApiService } from "./base-service";

@Injectable({
    providedIn: 'root'
})

export class UploadService {

    private readonly prefix = '/upload';

    constructor(private apiService: BaseApiService) {
    }
    
    public upload(formData: FormData): Observable<ApiResponse<string>> {
        return this.apiService.post(this.prefix + '/UploadImage', null, formData);
    }

}