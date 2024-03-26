package homeWork;

public class replaceNineWithZero {
    public static int replaceNineWithZero(int num) {
        if (num == 0) {
            return 0;
        }
        int lastDigit = num % 10;

        if (lastDigit == 9) {
            return replaceNineWithZero(num / 10) * 10 + 0;

        } else {
            return replaceNineWithZero(num / 10) * 10 + lastDigit;
        }
    }
}
