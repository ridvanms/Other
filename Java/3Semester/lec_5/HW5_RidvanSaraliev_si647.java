import java.util.Arrays;
import java.util.Scanner;
import java.util.Random;

public class HW5_RidvanSaraliev_si647 {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.println("Enter the rows: ");
    final int ROWS = scanner.nextInt();

    System.out.println("Enter the columns: ");
    final int COLUMNS = scanner.nextInt();

    int[][] arr = new int[ROWS][COLUMNS];
    // System.out.println(Arrays.deepToString(arr));
    for (int rows = 0; rows < arr.length; rows++) {
      for (int col = 0; col < arr[rows].length; col++) {
        arr[rows][col] = new Random().nextInt(90) + 10;
      }
    }
    // System.out.println(Arrays.deepToString(arr));

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