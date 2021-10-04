import { Component, OnInit } from "@angular/core";
import { LiveAuctionDetails } from "src/app/definitions/live-auction-details";
import { UserDetails } from "src/app/definitions/user-details";
import { LiveAuctionService } from "src/app/services/live-auction.service";
import { LoginService } from "src/app/services/login-service";

@Component({
    selector: 'live-auction',
    templateUrl: './live-auction.t.html',
})

export class LiveAuctionComponent implements OnInit {

  userDetails: UserDetails;

    constructor(private liveAuctionService: LiveAuctionService, private loginService: LoginService) {
      this.loginService.currentUser.subscribe((x) => {
          this.userDetails = x;
      })
    }

    ngOnInit(): void {
        this.liveAuctionService.retrieveMappedObject().subscribe((receivedObj: LiveAuctionDetails) => { this.addToInbox(receivedObj); });
    }

    auction: LiveAuctionDetails = {} as LiveAuctionDetails;
    msgInboxArray: LiveAuctionDetails[] = [];
  
    placeBid(): void {
      if(this.auction) {
        this.auction.productId = 'product123';
        this.auction.userId = this.userDetails.first_name;
        if(this.auction.userId.length == 0 || this.auction.price.length == 0){
          window.alert("Both fields are required.");
          return;
        } else {
          this.liveAuctionService.broadcastMessage(this.auction);                   // Send the message via a service
        }
      }
    }
  
    addToInbox(obj: LiveAuctionDetails) {
      let newObj = {} as LiveAuctionDetails;
      newObj.userId = obj.userId;
      newObj.price = obj.price;
      this.msgInboxArray.push(newObj);
  
    }
}
