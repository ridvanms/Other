package lect5;

import java.util.Arrays;

public class ParameterPassingDemo {
	
	public static void changeAttempt(int x, int[] arr) {
		x=100;
		arr[0]=123;
	}
	
	public static void main(String[] args) {
		int a=1;
		int[] nums= {1,2,3};
		String fmt="%s changeAttempt() a=%d nums=%s%n";
		System.out.printf(fmt,"Преди",a, Arrays.toString(nums));
        //Извикване на стат. void метод от класа на main()
		changeAttempt(a,nums);
		System.out.printf(fmt,"След", a, Arrays.toString(nums));
	}

}
