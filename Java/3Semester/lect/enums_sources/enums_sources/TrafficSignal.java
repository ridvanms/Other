package lect9;

public enum TrafficSignal {
	RED("#FF0000"), GREEN("#00FF00"), YELLOW("#FFFFOO");
	private String code;

	private TrafficSignal(String code) {
		this.code = code;
		System.out.println(this.name() + 
				" with code: "+ code);
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
		case RED: return "Stop!";
		case GREEN: return "Go!";
		case  YELLOW: return "Wait!";
		default: return null;
		}
	}
}
