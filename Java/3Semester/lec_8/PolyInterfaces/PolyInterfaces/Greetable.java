package lect8;

public interface Greetable {
	public void hello();  //метод без тяло
	public default void bye() {
		System.out.println("Довиждане");
	}

}
