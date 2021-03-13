import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.contants';
import { Flight } from 'src/app/list-flights/list-flights.component';
import { Reservation } from 'src/app/list-reservations/list-reservations.component';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {
  
  constructor(private http: HttpClient) { }
  retrieveAllFlights(){
    return this.http.get<Flight[]>(`${API_URL}api/flights`);
  }

  retrieveAllReservations(){
    return this.http.get<Reservation[]>(`${API_URL}api2/reservation`);
  }

  retrieveAllReservationsForUser(userId){
    return this.http.get<Reservation[]>(`${API_URL}api2/reservation/user=${userId}`);
  }

  retrieveAllReservationsForFlightNumber(flight){
    return this.http.get<Reservation[]>(`${API_URL}api2/reservation/flight=${flight}`);
  }

  retrieveAllReservationsForAirportFrom(airport){
    return this.http.get<Reservation[]>(`${API_URL}api2/reservation/airportfrom=${airport}`);
  }

  retrieveAllReservationsForAirportTo(airport){
    return this.http.get<Reservation[]>(`${API_URL}api2/reservation/airportTo=${airport}`);
  }

  deleteFlight(id){
    return this.http.delete(`${API_URL}api/flights/${id}`)
  }

  deleteReservation(id){
    return this.http.delete(`${API_URL}api2/reservation/id=${id}`)
  }

  getFlight(id){
    return this.http.get<Flight>(`${API_URL}api/flights/${id}`)
  }

  updateFlight(id, flight){
    return this.http.put(`${API_URL}api/flights/${id}`,flight)
  }

  createFlight(flight){
    return this.http.post(`${API_URL}api/flights/-1`,flight)
  }

}
