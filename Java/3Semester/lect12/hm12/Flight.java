import java.time.Duration;
import java.time.LocalTime;

public class Flight {
  private String destination;
  private LocalTime scheduled_departure;
  private Duration delay = Duration.ofMinutes(0);

  public Flight(String destination, LocalTime scheduledDeparture) {
    this.destination = destination;
    this.scheduled_departure = scheduledDeparture;
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

  public void setScheduledDeparture(LocalTime scheduledDeparture) {
    this.scheduled_departure = scheduledDeparture;
  }

  public void setDelay(int hours, int minutes) {
    this.delay = Duration.ofHours(hours).plusMinutes(minutes);
  }

  public void setDelay(int minutes) {
    this.delay = Duration.ofMinutes(minutes);
  }

  public LocalTime getRealDepartureTime() {
    return scheduled_departure.plus(delay);
  }
  @Override
  public String toString() {
    LocalTime realDepartureTime = getRealDepartureTime();
    
    String status = scheduled_departure.isAfter(realDepartureTime.plusMinutes(5)) ? "Излетял" : "Планиран";

    return String.format("Дестинация: %s, Час на излитане по разписание: %s, Реално време на излитане: %s, Статус: %s",destination,scheduled_departure,realDepartureTime,status);
  }
}