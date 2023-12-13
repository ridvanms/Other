package lect9;

public class TrafficSignalTest {

	public static void main(String[] args) {
		TrafficSignal ts1= TrafficSignal.GREEN;
		
		System.out.println("ts1.ordinal():"+ts1.ordinal());
		System.out.println("ts1.name():"+ts1.name());
		System.out.println("ts1.toString():"+ts1.toString());
		System.out.println("ts1.getCode():"+ts1.getCode());
		
		System.out.println("Обхождане на изброяването TrafficSignal");
		for(TrafficSignal t:TrafficSignal.values()) {
			System.out.print("t.ordinal()="+t.ordinal());
			System.out.print(" t.name()="+t.name());
			System.out.print(" t.toString()="+t.toString());
			System.out.println(" t.getCode()="+t.getCode());
		}
	}
}
