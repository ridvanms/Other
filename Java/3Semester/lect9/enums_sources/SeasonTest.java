package lect9;

import java.util.Arrays;
import java.util.Scanner;

public class SeasonTest {

	public static void main(String[] args) {
		Season s1= Season.SPRING;
		System.out.println("s1==s1.toString()="+s1+" "+s1.toString());
		//name() - Име на изброената константа
		System.out.println("s1.name()="+s1.name());
		//ordinal() - пореден номер на изброената константа
		System.out.println("s1.ordinal()="+s1.ordinal());
		
		//Статичен метод values() - списък от избр.константи
	
		System.out.println(Arrays.toString(Season.values()));//използва toString() на Season
		for(Season s:Season.values()) {
			System.out.printf("%d %s %s %n",s.ordinal(), s.name(), s);
		}
		
		//Статичен метод valueOf(string) - връща обект enum
		String mySeason;
		System.out.print("Име на сезон: WINTER, SPRING, SUMMER, AUTUMN ?");
		mySeason=new Scanner(System.in).next();
		
		Season mySeasonEnum= Season.valueOf(mySeason);
		System.out.println(mySeasonEnum);

	}

}
