package homeWork;
import java.util.Arrays;

public class RidvanSaraliev_si647 {

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print("a[" + i + "]=" + arr[i] + "\t");
        }
    }
    public static void main(String[] args) {
        // System.out.println(replaceNineWithZero.replaceNineWithZero(1239012939)); // Output: 1230012030
        
        // 2 zadach
        // int[] arr = { 5, 2, 14, 7, 3, 10 };
        // System.out.println("Before:");
        // System.out.println(Arrays.toString(arr));

        // reverseArray.reverseArray(arr);

        // System.out.println("After:");
        // System.out.println(Arrays.toString(arr));

        //3 zadacha
        int [][] matrix = {
            {5,2,14},
            {7,3,10},
            {2,1,4},
            {6,8,9},
        };
        SquareMatrixSorter.sortSquareMatrix(matrix);

        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }
    }
}