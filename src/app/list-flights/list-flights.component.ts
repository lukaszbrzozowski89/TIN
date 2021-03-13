import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FlightDataService } from "../service/data/flight-data.service";

export class Flight {
  constructor(
    public id: number,
    public flightNumber: string,
    public airportFrom: string,
    public airportTo: string
  ) {}
}

@Component({
  selector: "app-list-flights",
  templateUrl: "./list-flights.component.html",
  styleUrls: ["./list-flights.component.css"],
})
export class ListFlightsComponent implements OnInit {
  flights: Flight[]
  message: string
  constructor(private service: FlightDataService,
    private route: Router) {}

  ngOnInit() {
    this.getAllFlight()
  }

  deleteFlight(id){
    this.service.deleteFlight(id).subscribe(
      res =>{
        console.log(res)
        this.message = `Delete of Flight ${id} successful`
        this.getAllFlight()
    })
  }

  updateFlight(id){
    this.route.navigate(['flights',id])
  }

  addFlight(){
    this.route.navigate(['flights', -1])
  }

  getAllFlight(){
    this.service.retrieveAllFlights().subscribe(
      resp => {
        console.log(resp);
        this.flights = resp;
      }
    )
  }
}
