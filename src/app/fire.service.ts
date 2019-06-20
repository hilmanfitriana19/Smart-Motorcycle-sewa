import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {    
  constructor(public db : AngularFirestore) { }

  getMotor() : Observable<any[]>{
    return this.db.collection('/recent_sensor_data').snapshotChanges()
    }
   getDefaultMotor() : Observable<any[]>{
    return this.db.collection('/recent_sensor_data').valueChanges()
    }    
    getDataMotor(motor_id: string){
		return this.db.doc<any>(`motorcycle/${motor_id}`).valueChanges()     
	}		
	getDataSensorMotor(motor_id: string){
		return this.db.doc<any>(`recent_sensor_data/${motor_id}`).valueChanges()
	}		
}