package homeWork;

import java.util.Arrays;

public class SquareMatrixSorter {
    
    public static void sortSquareMatrix(int[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            if (isOdd(i)) {
                sortInDecreasingOrder(matrix[i]);
            } else {
                sortInIncreasingOrder(matrix[i]);
            }
        }
    }

    private static boolean isOdd(int index) {
        return index % 2 != 0;
    }

    private static void sortInDecreasingOrder(int[] arr) {
        Arrays.sort(arr);
        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }
    }
    private static void sortInIncreasingOrder(int[] arr) {
        Arrays.sort(arr);
    }
}
