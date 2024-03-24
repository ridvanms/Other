package lect10;

import java.util.ArrayList;
import java.util.List;

public class TestHotels {

	public static void main(String[] args) {
		Hotel h1 = new Hotel();
		System.out.println(h1);
		System.out.println("wifi:" + h1.getWiFi());
		h1.store("h1.txt");

		ChainHotel ch1 = new ChainHotel();
		System.out.println(ch1);
		ch1.addCity("Бургас");
		ch1.addCity("Русе");
		ch1.setName("Мираж");
		System.out.println(ch1);
		System.out.println(ch1.getWiFi());
		ch1.store("ch1.txt");
		System.out.println();
		// Добавено
		// Създаване на обект с втория конструктор
		ChainHotel ch2 = new ChainHotel("Зл.пясъци", "***", "А Hotels",
				new ArrayList<>(List.of("Варна", "Русе", "Китен")));
		System.out.println(ch2);
		ch2.setName("Нептун");
		ch2.addCities(List.of("Царево", "Созопол"));
		System.out.println(ch2);
		System.out.println("Хотел в Бургас на " + ch2.getChain_name() + "?" + ch2.checkCity("Бургас"));
		ch2.store("ch2.txt");

		// Създаване на обект с третия конструктор
		ChainHotel ch3 = new ChainHotel("Aстория", "***", "Grifid Hotels",
				new ArrayList<>(List.of("София", "Пловдив", "Плевен")));
		System.out.println(ch3);
		ch3.setStars(4);
		ch3.setCity(1, "Kaзанлък");
		ch3.setCity(3, "Ловеч");
		System.out.println("След промяната");
		System.out.println(ch3);
	}

}
