import java.util.Random;
import java.util.Scanner;

public class GuessingNumber {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Random rand = new Random();

    int randomNumber = rand.nextInt(100) + 1;
    // System.out.printf("The number is: %d \n",randomNumber);
    while (true) {
      System.out.println("Enter your guess number (1-100): ");
  
      int playerGuess = scanner.nextInt();
  
      if (playerGuess == randomNumber) {
        System.out.println("You won! You guessed correctly!");
        break;
      } else if (playerGuess > randomNumber) {
        System.out.println("NOPE! The number is lower!");
      }
      else{
        System.out.println("NOPE! The number is higher!");
      }
    }
  }
}