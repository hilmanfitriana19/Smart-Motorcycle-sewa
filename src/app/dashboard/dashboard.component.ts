import { Component, OnInit,OnChanges,SimpleChanges,Input  } from '@angular/core';
import { FireService } from '../fire.service';
import { Observable,from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {	
	motor: Observable<any[]>;
	data: Observable<any[]>;
	oil: number=0;
	accu: number=0;
	on:number=0;
	img:string="./assets/img/soundOff2.png";
	@Input() motorid=null;
	constructor(public service: FireService) { }
	
	ngOnInit(){
	this.motorid=prompt("Masukkan ID kendaraan");
	  this.service.getDataMotor(this.motorid).subscribe(doc =>{
		 this.motor=doc;		 
	  });	  	  
	  this.service.getDataSensorMotor(this.motorid).subscribe(doc =>{
		  this.data=doc;
		  this.oil =  Math.round((doc.oil_volume*100)/800);
		  this.accu=doc.battery_voltage;
		  console.log(this.oil);
	  });	  	  
	}	
	onoff(){			  
		if (this.on==1){
			console.log("ALARM MATI");
			this.img="./assets/img/soundOff2.png";
			this.on=0;
		}else{
			console.log("ALARM NYALA");
			this.img="./assets/img/soundOn2.png";
			this.on=1;
		}
	}
	notifOil():string{		
		if(this.oil>37.5){
			return "Safe, You're Good To Go!";
		}else if (this.oil > 12.5){
			return "Warning, Be Prepared!";
		}else return "Critical, Take Action!";
	}		
	notifaccu():string{		
		if(this.accu>13.3&&this.accu<14.6){
			return "Safe, You're Good To Go!";
		}else if (this.accu<=13.2&&this.accu>12.7){
			return "Warning, Be Prepared!";
		}else return "Critical, Take Action!";
	}		
	setOil():string{
		if(this.oil>37.5){
			return "progress-bar bg-success";
		}else if (this.oil > 12.5){
			return "progress-bar bg-warning";
		}else return "progress-bar bg-danger";
	}
	getOil(){
		return this.oil.toString()+"%";
	}
	getAccu(){
		return this.accu;
	}
}

