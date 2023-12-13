package lect9;

import java.util.Arrays;
import java.util.Scanner;

public class SeasonTest {

	public static void main(String[] args) {
		Season s1= Season.SPRING;
		System.out.println("s1==s1.toString()="+s1+" "+s1.toString());
		System.out.println("s1.name()="+s1.name());
		System.out.println("s1.ordinal()="+s1.ordinal());
		
		System.out.println(Arrays.toString(Season.values()));
		for(Season s:Season.values()) {
			System.out.printf("%d %s %s %n",s.ordinal(), s.name(), s);
		}
		
		String mySeason;
		System.out.print("Name of the season: WINTER, SPRING, SUMMER, AUTUMN ?");
		mySeason=new Scanner(System.in).next();
		
		Season mySeasonEnum= Season.valueOf(mySeason);
		System.out.println(mySeasonEnum);
	}
}