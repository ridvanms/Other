package lect9;

public enum Season {
	WINTER, SPRING, SUMMER, AUTUMN;
	
	@Override
	public String toString() {
		switch(this) {
		case WINTER: return "winter";
		case SPRING: return "spring";
		case  SUMMER: return "summer";
		case  AUTUMN: return "autumn";
		default: return null;
		}
	}
}
