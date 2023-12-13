package lect10;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Random;

public class Hotel implements Storable {
	private String name;
	private String stars;
	
	// overload конструктори
	public Hotel() {
		name = "Приморец"; // this.name="Приморец";
		stars = "*****"; // this.stars="*****"; stars= new String("*****");
	}// Hotel obj = new Hotel()

	public Hotel(String name, String stars) {
		this.name = name;
		this.stars = stars;
	} // Hotel obj = new Hotel("Мираж", "***");

	public Hotel(String name, int countStars) {
		this.name = name;
		// може setStars(countStars) вместо следващите редове
		char[] arr = new char[countStars];
		Arrays.fill(arr, '*');
		this.stars = new String(arr);
	} // Hotel obj= new Hotel("Аква",4);

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStars() {
		return stars;
	}

	// оverload методи за задаване на звездите
	public void setStars(String stars) {
		this.stars = stars;
	}

	public void setStars(int cStars) {
		char[] arr = new char[cStars];
		Arrays.fill(arr, '*');
		this.stars = new String(arr);
	}

	@Override
	public String toString() {
		return name + " " + stars;
	}

	@Override
	public void store(String filename) {
		try {
			Files.writeString(Path.of(filename), this.toString());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}

	}

	public String getWiFi() {
		StringBuilder sb = new StringBuilder();
		String word = name.length() > 4 ? name.substring(0, 4) : name;
		sb.append(word.toLowerCase());
		Random rg = new Random();
		for (int i = 1; i <= 4; i++) {
			sb.append(rg.nextInt(10));
		}
		return sb.toString();
	}

}
