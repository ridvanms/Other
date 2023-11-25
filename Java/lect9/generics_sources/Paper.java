package lect9;

public class Paper {
private String kind="картон";

	
	public Paper(String kind) {
		super();
		this.kind = kind;
	}
	public Paper() {
		
	}
	@Override
	public String toString() {
		return "Хартия," + kind ;
	}
}
