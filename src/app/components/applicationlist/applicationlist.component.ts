import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Application, ApplicationStatus, ApplicationType } from '../../interfaces/application';
import { WebSocketService } from '../services/web-socket.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-applicationlist',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './applicationlist.component.html',
  styleUrl: './applicationlist.component.scss'
})
export class ApplicationlistComponent implements OnInit{
  isCreatePopupVisible = false;
  applications:Application[]=[]
  private messageSubscription!: Subscription;
  newApplication:Application={guid:1,date:new Date(),type:ApplicationType.Request,status:ApplicationStatus.Submitted,message:""}
  constructor(private api:ApiService,
    private auth:AuthService, private webSocketService:WebSocketService){}

  ngOnInit(): void {
    this.refreshApplications();
    this.messageSubscription = this.webSocketService.onMessage().subscribe(
      (message: string) => {
        console.log(message)
        if (message === 'Applications updated') {
          this.refreshApplications();
        }
      },
      (error) => console.error(error)
    );
  }
  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.webSocketService.close();
  }
  showCreatePopup(): void {
    this.isCreatePopupVisible = true;
  }
  getTypeDescription(type: number): string {
    switch (type) {
      case 0: return 'Request';
      case 1: return 'Suggestion';
      case 2: return 'Complaint';
      default: return 'Unknown';
    }
  }
  private refreshApplications(): void {
    this.api.getApplications().subscribe((data: Application[]) => {
      console.debug(data)
      this.applications = data;
    }, error => {
      console.error('Error fetching applications', error);
    });
  }
  closeCreatePopup(): void {
    this.isCreatePopupVisible = false;
  }
  submitNewApplication():void{
    this.api.createApplication(this.newApplication).subscribe(
      success => {
        console.debug("success");
        //this.refreshApplications();
        this.closeCreatePopup();
      }, error => {
        console.log(error);
      }
    );
  }
}
