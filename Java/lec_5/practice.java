import java.util.Scanner;
import java.util.Arrays;
import java.util.Random;

public class practice {
 
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter the rows: ");
    final int ROWS = sc.nextInt();
    
    System.out.print("Enter the columns: ");
    final int COLUMNS = sc.nextInt();

    int[][] arr = new int[ROWS][COLUMNS];
    for (int rows = 0; rows < arr.length; rows++) {
      for (int col = 0; col < arr[rows].length; col++) {
        arr[rows][col] = new Random().nextInt(90) + 10;
      }
    }

    int[] totals = new int[ROWS];
    int indexOfMaxRow = 0;
    int maxSum = 0;
    for (int row = 0; row < arr.length; row++) {
      int sum = 0;
      for (int col = 0; col < arr[row].length; col++) {
        sum += arr[row][col];
      }
      if (sum > maxSum) {
        maxSum = sum;
        indexOfMaxRow = row;
      }
      totals[row] = sum;
    }
    System.out.println(Arrays.toString(totals));
    System.out.println("Max sum in a row: " + (indexOfMaxRow + 1));
  }
}
