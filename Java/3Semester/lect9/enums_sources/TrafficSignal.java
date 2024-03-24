package lect9;

public enum TrafficSignal {
	RED("#FF0000"), GREEN("#00FF00"), YELLOW("#FFFFOO");
	private String code;

	private TrafficSignal(String code) {
		this.code = code;
		System.out.println("Инициализация на "+this.name() + 
				" с код: "+ code);
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	@Override
	public String toString() {
		switch(this) {
		case RED: return "Спри!";
		case GREEN: return "Върви!";
		case  YELLOW: return "Изчакай!";
		default: return null;
		}
	}
}
