package lect10;

import java.util.ArrayList;
import java.util.List;

public class ChainHotel extends Hotel {
	private String chain_name;
	private List<String> cities;

	//overload конструктори
	public ChainHotel() {
		super();
		chain_name = "Victoria Hotels";
		cities = new ArrayList<>();
	}

	public ChainHotel(String name, String stars, String chain_name, ArrayList<String> cities) {
		super(name, stars);
		this.chain_name = chain_name;
		this.cities = cities;
	}
	
	 public ChainHotel(String name, int countStars, String chain_name,
   		  ArrayList<String> cities) {
   	 super(name, countStars);
   	 this.chain_name=chain_name;
   	 this.cities= cities;
    }

	public String getChain_name() {
		return chain_name;
	}

	public void setChain_name(String chain_name) {
		this.chain_name = chain_name;
	}

	public List<String> getCities() {
		return cities;
	}

	public void setCities(List<String> cities) {
		this.cities = cities;
	}

	// връща града със зададен индекс
	public String getCity(int index) {
		try {
			return cities.get(index);
		} catch (IndexOutOfBoundsException e) {
			return "Няма град с индекс " + index;
		}
	}

	public void setCity(int index, String value) {
		try {
			cities.set(index, value);
		} catch (IndexOutOfBoundsException e) {
			System.out.println("Няма град с индекс " + index);
		}
	}

	// добавя град
	public void addCity(String ncity) {
		cities.add(ncity);
	}

	// добавя списък от градове
	public void addCities(List<String> newCities) {
		cities.addAll(newCities);
	}

	// проверява дали в даден град има хотел от тази верига.
	public boolean checkCity(String city) {
		return cities.contains(city);
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder(super.toString() + "\n");
		sb.append("Верига:" + chain_name);
		sb.append(" Има хотели в градовете:" + cities);
		return sb.toString();
	}
}
