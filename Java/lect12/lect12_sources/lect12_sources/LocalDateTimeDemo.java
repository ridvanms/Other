package lect12;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public class LocalDateTimeDemo {

	public static void main(String[] args) {
		LocalDateTime dt_now = LocalDateTime.now();
		System.out.println(dt_now);
		
		DateTimeFormatter dtf=DateTimeFormatter
				.ofPattern("dd.MM.yyyy HH:mm");
		System.out.println(dt_now);
		System.out.println(dt_now.format(dtf));
	}

}
