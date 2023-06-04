import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // strict discovery document disallows urls which not start with issuers url
  strictDiscoveryDocumentValidation: false,

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/google-auth/signin',
  //redirectUri: 'https://zibrid.com/google-auth/signin',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '322203041724-ti394h5jtgvmpo4elhetat0cc9pd32l6.apps.googleusercontent.com',

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  showDebugInformation: true,
};

export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string,
    family_name: string,
    given_name: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  gmail = 'https://gmail.googleapis.com';

  userProfileSubject = new Subject<UserInfo>();

  serverURL = 'http://localhost:3000/';
  //serverURL = 'http://3.69.12.0:3000/';
  apiURL = 'api/users'

  constructor(
    private oAuthService: OAuthService,
    private _http: HttpClient
  ) {    

    if (!localStorage.getItem('access_google_checkout')) {
      localStorage.setItem('access_google_checkout', history.state.data);
    }
    
    // confiure oauth2 service
    oAuthService.configure(authCodeFlowConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    oAuthService.loadDiscoveryDocument().then(() => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      oAuthService.tryLoginImplicitFlow().then(() => {

        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
        }

      })
    });
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signOut() {
    this.oAuthService.logOut()
  }

  signinGoogle(user: any): Observable<string> {

    return this._http.post<string>(`${this.serverURL}${this.apiURL}/google-auth/signin`, user);
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}
