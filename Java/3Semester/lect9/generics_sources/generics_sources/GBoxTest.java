package lect9;

public class GBoxTest {

	public static void main(String[] args) {
		//Box, съдържащ цяло число, обект Integer
		GBox<Integer> i_box1= new GBox<>();
		i_box1.setItem(10);
		GBox<Integer> i_box2= new GBox<>(20);
		System.out.println(i_box1);
		System.out.println(i_box2);
		
		//Box, съдържащ обект Paper
		GBox<Paper> p_box1= new GBox<>();
		p_box1.setItem(new Paper());
		GBox<Paper> p_box2= new GBox<Paper>(new Paper("вестник"));
		System.out.println( p_box1);
		System.out.println( p_box2);

	}

}
