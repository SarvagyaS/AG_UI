import { KeyValuePair } from './key-value-pair';

export interface ApiResponse<T>{
    isSuccess: boolean,
    errors: KeyValuePair[],
    data: T
}