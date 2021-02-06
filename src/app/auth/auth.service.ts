import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData{
    idTOken: string, 
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string

}

@Injectable({ providedIn: 'root'})
export class AuthService{
    
    constructor(private http: HttpClient){}
    
    signup(email: string, password: string){
        return this.http.post<AuthResponseData >('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB__t-c3mnP_7cw8xw1pHQ8iwUGiMQUgvY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }
}