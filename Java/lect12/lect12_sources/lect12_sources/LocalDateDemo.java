package lect12;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Scanner;

public class LocalDateDemo {
	public static void main(String[] args) {
		//LocalDate представя датата във формат yyyy-MM-dd
        //Създаване на обекти LocalDate
		//1a. Съдържащ текущата дата LocalDate.now()
		LocalDate today= LocalDate.now();
		System.out.println(today);
		
		//1b. Съдържащ произволна дата LocalDate.оf(година, месец, ден)
		 LocalDate dt1= LocalDate.of(2023, 9, 19);
		 System.out.println(dt1);
		 
		//1с. От дата, зададена като низ LocalDate.parse("yyyy-MM-dd")
//		Scanner sc= new Scanner(System.in);
//		System.out.print("Край на семестъра yyyy-MM-dd?");
//		String dt2S= sc.next();
		 String dt2S="2023-12-23";
		LocalDate dt2 = LocalDate.parse(dt2S);
		System.out.println(dt2);
		
		//2.Съставки на датата
		System.out.println("Днес е:"+today);
		System.out.println("Ден на месеца:"+today.getDayOfMonth());
		System.out.println("Ден на годината:"+today.getDayOfYear());
		System.out.println("Месец номер:"+today.getMonthValue());
		System.out.println("Месец:"+today.getMonth());
		System.out.println("Година:"+today.getYear());
		System.out.println("Ден на седмицата:"+today.getDayOfWeek());
		
		
		//5.Локализация на месеца и деня на седмицата
		//<месец>|<ден на седмицата>.getDisplayName(TextStylе.XXX, locale)
		Month m= today.getMonth();
		String m_bg=m.getDisplayName(TextStyle.FULL,
				new Locale("bg", "BG"));
		
		System.out.println(m_bg);
		
		Locale locale= new Locale("bg", "BG");
		DayOfWeek wd=today.getDayOfWeek();
		String wd_bg= wd.getDisplayName(TextStyle.FULL, locale);
		System.out.println(wd_bg);
		
		//3.Промяна на съставка на датата <дата>.withXXX(<брой>)
		LocalDate tomorrow=today.withDayOfMonth(14);
		System.out.println("Утре:"+tomorrow);
		
		//4 Добавяне/изваждане на съставка на датата
		LocalDate dt3= today.plusYears(2).plusMonths(3)
				    .plusDays(16);
		LocalDate yesterday= today.minusDays(1);
		System.out.println("dt3:"+dt3);
		System.out.println("yesterday:"+yesterday);
		
		//6.Period - за разлика в дати
		Period per1= Period.between(today, dt3);
		System.out.println(per1);
		System.out.println("Години:"+per1.getYears());
		System.out.println("Meсеци:"+per1.getMonths());
		System.out.println("Дни:"+per1.getDays());
		
		//7.Форматиране
		//DateTimeFormatter.ofPattern("низ за форматиране")
		//DateTimeFormatter.ofLocalizedDate(FormatStyle.XXX).withLocale(locale)
		
		DateTimeFormatter df=DateTimeFormatter.ofPattern("dd.MM.yyyyг");
		DateTimeFormatter df2=DateTimeFormatter
				         .ofLocalizedDate(FormatStyle.LONG).withLocale(locale);
	    String todayF1= today.format(df);
	    String todayF2= today.format(df2);
	    
	    System.out.println(todayF1);
	    System.out.println(todayF2);
	
	}
}
