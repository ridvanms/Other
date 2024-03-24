import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.Random;

public class HW12_RidvanSaraliev_si647 {
  public static void main(String[] args) {
    ArrayList<Flight> flights = new ArrayList<>();

    Flight flight1 = new Flight("London", LocalTime.of(9, 0));
    Flight flight2 = new Flight("Paris", LocalTime.of(10, 30));
    Flight flight3 = new Flight("London", LocalTime.of(12, 0));

    flight1.setDelay(1, 30);
    flight2.setDelay(-15);
    flight3.setDelay(0, 45);
    
    flights.add(flight1);
    flights.add(flight2);
    flights.add(flight3);
    
    System.out.println("\n Списък на всички полети: ");
    for (Flight flight : flights) {
      System.out.println(flight);
    }

    System.out.println("\n Списък на предстоящите полети:");
    LocalTime currentTime = LocalTime.now();
    for (Flight flight : flights) {
      if (flight.getRealDepartureTime().isAfter(currentTime)) {
        System.out.println(flight);
      }
    }
  }
}