import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Flight } from "../list-flights/list-flights.component";
import { FlightDataService } from "../service/data/flight-data.service";

@Component({
  selector: "app-flight",
  templateUrl: "./flight.component.html",
  styleUrls: ["./flight.component.css"],
})
export class FlightComponent implements OnInit {
  id: number;
  flight: Flight;
  constructor(
    private route: ActivatedRoute,
    private service: FlightDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.flight = new Flight(this.id, "", "", "");
    if (this.id != -1) {
      this.service.getFlight(this.id).subscribe((res) => {
        this.flight = res;
      });
    }
  }

  saveFlight() {
    if (this.id != -1) {
      this.service.updateFlight(this.id, this.flight).subscribe((resp) => {
        console.log(resp);
        this.router.navigate(["flights"])
      })
    } else {
      this.service.createFlight(this.flight).subscribe((resp) => {
        console.log(resp);
        this.router.navigate(["flights"])
      })
    }
  }
}
