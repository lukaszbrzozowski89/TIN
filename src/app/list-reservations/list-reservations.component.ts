import { Component, OnInit } from "@angular/core";
import { Flight } from "../list-flights/list-flights.component";
import { BasicAuthenticationService } from "../service/basic-authentication.service";
import { FlightDataService } from "../service/data/flight-data.service";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string
  ) {}
}
export class Reservation {
  constructor(
    public id: number,
    public flight: Flight,
    public user: User,
    public flightNumber: Flight,
    public airportFrom: Flight,
    public airportTo: Flight,
    public firstName: User,
    public lastName: User
  ) {}
}

@Component({
  selector: "app-list-reservations",
  templateUrl: "./list-reservations.component.html",
  styleUrls: ["./list-reservations.component.css"],
})
export class ListReservationsComponent implements OnInit {
  reservations: Reservation[];
  userId = 1
  airportFrom
  airportTo
  flightNumber
  message: string

  constructor(
    private service: FlightDataService,
    private basic: BasicAuthenticationService
  ) {}

  ngOnInit() {
   this.resetFilters()
  }

  deleteReservation(id){
    this.service.deleteReservation(id).subscribe(
      res =>{
        console.log(res)
        this.message = `Delete of Flight ${id} successful`
        this.resetFilters()
    })
  }

  filterById(){
    this.service.retrieveAllReservationsForUser(this.userId).subscribe((resp) => {
      console.log(resp);
      this.reservations = resp;
    });
  }

  filterByFlightNumber(){
    this.service.retrieveAllReservationsForFlightNumber(this.flightNumber).subscribe((resp) => {
      console.log(resp);
      this.reservations = resp;
    });
  }

  filterByAirportFrom(){
    this.service.retrieveAllReservationsForAirportFrom(this.airportFrom).subscribe((resp) => {
      console.log(resp);
      this.reservations = resp;
    });
  }

  filterByAirportTo(){
    this.service.retrieveAllReservationsForAirportTo(this.airportTo).subscribe((resp) => {
      console.log(resp);
      this.reservations = resp;
    });
  }

  resetFilters(){
    this.service.retrieveAllReservations().subscribe((resp) => {
      console.log(resp);
      this.reservations = resp;
    });
  }
}
