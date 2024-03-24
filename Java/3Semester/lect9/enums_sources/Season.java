package lect9;

public enum Season {
	WINTER, SPRING, SUMMER, AUTUMN;
	
	@Override
	public String toString() {
		switch(this) {
		case WINTER: return "Зима";
		case SPRING: return "Пролет";
		case  SUMMER: return "Лято";
		case  AUTUMN: return "Есен";
		default: return null;
		}
	}
}
