import java.time.LocalTime;
import java.util.ArrayList;

public class mainTest{
  public static void main(String[] args){
    ArrayList<Flight> flights = new ArrayList<>();

    Flight flight1 = new Flight("London", LocalTime.of(10, 30));
    Flight flight2 = new Flight("Sofia", LocalTime.of(20, 40));
    Flight flight3 = new Flight("Istanbul", LocalTime.of(13, 10));

    flight1.setDelay(10);
    flight2.setDelay(-1,10);
    flight3.setDelay(3, 30);
    
    flights.add(flight1);
    flights.add(flight2);
    flights.add(flight3);

    System.out.println("\n All flights");
    for (Flight flight : flights) {
      System.out.println(flight);
    }
    System.out.println("_______________________________");

    System.out.println("\n All current flights");
    LocalTime currentTime = LocalTime.now();
    for (Flight flight : flights) {
      if (!flight.getRealDepartureTime().isAfter(currentTime)) {
        System.out.println(flight);
      }
    }
  }
}