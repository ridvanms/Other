package lect12;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Set;

public class ZonedDateTimeDemo {

	public static void main(String[] args) {
		Set<String> zonesIds = ZoneId.getAvailableZoneIds();
		for (var z : zonesIds) {
			if (z.startsWith("Europe"))
				System.out.println(z);
		}

		// Създаване на обект ZonedDateTime с текущaта дата и час
		// ZonedDateTime.now() ZonedDateTime.now(ZoneId.of("низ")

		ZonedDateTime nowBg = ZonedDateTime.now();
		System.out.println(nowBg);
		ZonedDateTime nowParis = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
		System.out.println(nowParis);

		// Създаване на обект ZonedDateTime с произволна дата и час
		// ZonedDateTime.of(година, месец, ден, час, минути, секунди, наносекунди, зона)
		// ZonedDateTime.of(LocalDateTime, zoneID)
		// ZonedDateTime.of(LocalDate, LocalTime, zoneID)

		// Получаване на ZonedDateTime, съответстващ на дадения в
		// друга часова зона <обект ZonedDateTime>.withZoneSameInstant(zoneID)
		// Полет София-Ню-Йорк
		// Излита от София 2:15
		ZonedDateTime depart = ZonedDateTime.of(LocalDate.now(), LocalTime.of(2, 15), ZoneId.systemDefault());
		ZonedDateTime departNY = depart.withZoneSameInstant(ZoneId.of("America/New_York"));

		// полет 9 часа 15 мин
		ZonedDateTime arrive = departNY.plusHours(9).plusMinutes(15);
		System.out.println("Час на пристигане в друга часова зона");
		System.out.println("depart Sofia:" + depart);
		System.out.println("arrive NY:" + arrive);

		// Oбратна задача - известни са часовете на излитане и пристигане
		//Да се определи времето на полета
		ZonedDateTime departure = ZonedDateTime.of(LocalDateTime.of(2023, Month.DECEMBER, 9, 15, 0),
				ZoneId.of("Europe/Paris"));
		ZonedDateTime arrival = ZonedDateTime.of(LocalDateTime.of(2023, Month.DECEMBER, 9, 15, 15),
				ZoneId.of("America/New_York"));
		Duration duration = Duration.between(departure, arrival);
		System.out.printf("Време на полета Париж-Ню Йорк %d часа и  %d минути.%n", duration.toHoursPart(), duration.toMinutesPart());

	}

}
