import java.time.Duration;
import java.time.LocalTime;

public class Flight{
  private String destination;
  private LocalTime scheduled_departure;
  private Duration delay = Duration.ofMinutes(0);

  public Flight(String destination, LocalTime scheduled_departure) {
    this.destination = destination;
    this.scheduled_departure = scheduled_departure;
  }
  
  public String getDestination() {
    return this.destination;
  }

  public void setDestination(String destination) {
    this.destination = destination;
  }

  public LocalTime getScheduledDeparture() {
    return this.scheduled_departure;
  }

  public void setScheduledDeparture(LocalTime scheduleDeparture) {
    this.scheduled_departure = scheduleDeparture;
  }
  
  public void setDelay(int hours, int minutes) {
    this.delay = Duration.ofHours(hours).plusMinutes(minutes);
  }

  public void setDelay(int minutes) {
    this.delay = Duration.ofMinutes(minutes);
  }

  public LocalTime getRealDepartureTime() {
    return this.scheduled_departure.plus(delay);
  }

  @Override
  public String toString() {
    LocalTime realTimeDeparuter = getRealDepartureTime();
    String status = scheduled_departure.isAfter(realTimeDeparuter.plusMinutes(5)) ? "Departure" : "Planned";

    return String.format("Destination: %s \n Scheduled Departure: %s \n Real time of departure: %s \n status: %s", this.destination,this.scheduled_departure,realTimeDeparuter,status); 
  }
}