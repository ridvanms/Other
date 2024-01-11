
import java.util.Scanner;

public class HW3_RidvanSaraliev_si647 {
  public static void main(String[] args) {
    
    Scanner input = new Scanner(System.in);

    System.out.println("Enter two names: ");
    String nameOne = input.next();
    String nameTwo = input.next();

    if (nameOne.length() > nameTwo.length()) {
      System.out.println(nameOne + " is longer!");
    } else {
      System.out.println(nameTwo + " is longer!");
    }

    
    System.out.println("Divide two numbers: ");
    
    System.out.print("First number: ");
    int firstNum = input.nextInt();

    System.out.print("Second number: ");
    int secondNum = input.nextInt();

    if (firstNum == 0 || secondNum == 0) {
      System.out.println("------------------------");
      System.out.println("You can not operate with 0");
      System.out.println("------------------------");
      return;
    }
    System.out.println("------------------------");
    int result = firstNum / secondNum;
    System.out.printf("%d / %d = %d \n", firstNum, secondNum, result);
    System.out.println("------------------------");
  }
}