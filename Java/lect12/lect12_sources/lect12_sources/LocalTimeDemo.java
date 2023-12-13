package lect12;

import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class LocalTimeDemo {

	public static void main(String[] args) {
		//Създаване
		LocalTime now= LocalTime.now();
		System.out.println(now);
		DateTimeFormatter tf= DateTimeFormatter.ofPattern("HH:mm");
		String nowS=tf.format(now);
		String nowS2=now.format(tf);
		System.out.println(nowS);
		 
		LocalTime t1= LocalTime.of(11, 40);
		//Добавяне на интервали от време
		LocalTime t2= t1.plusHours(4).plusMinutes(23);
		System.out.println(t1.format(tf));
		System.out.println(t2.format(tf));
		
        //Разлика във времена - Duration
		LocalTime t3= LocalTime.parse("11:20");
		Duration d= Duration.between(LocalTime.now(), t3);
		System.out.println(d);
		System.out.println("Остават минути:"+d.toMinutes());
		System.out.printf("Остават %d час(а) %d минути%n",
				d.toHoursPart(),d.toMinutesPart());
		
		
	}

}
