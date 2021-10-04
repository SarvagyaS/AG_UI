import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from "rxjs";
import { Constants } from "../definitions/constants";
import { LiveAuctionDetails } from "../definitions/live-auction-details";

@Injectable({
  providedIn: 'root'
})

export class LiveAuctionService {

  private connection: any = new signalR.HubConnectionBuilder().withUrl(Constants.baseUrl + "/LiveAuctionSocket")
    .configureLogging(signalR.LogLevel.Information)
    .build();

  readonly POST_URL = Constants.apiBaseUrl + "/LiveAuction/SendGlobal"

  private auction: LiveAuctionDetails = {} as LiveAuctionDetails;
  private sharedObj = new Subject<LiveAuctionDetails>();

  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user, message) => { this.mapReceivedMessage(user, message); });
    this.start();
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.auction.userId = user;
    this.auction.price = message;
    this.sharedObj.next(this.auction);
  }

  // Calls the controller method
  public broadcastMessage(msgDto: LiveAuctionDetails) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<LiveAuctionDetails> {
    return this.sharedObj.asObservable();
  }

}