package lect8;

public class FullCan extends Can {
    private String liquid;  //течност
    private double  density; //плътност в кг на м3
	public FullCan() {
		super();
		this.liquid="вода";
		this.density=998;
	}

	public FullCan(double r, double h, String liquid, double  density) {
		super(r, h);
		this.liquid=liquid;
		this.density=density;
	}

	@Override
	public String toString() {
		return  super.toString()+" течност:"+liquid;
	}
	
	public double weight() {
		//приемаме 95% запълване
		return 0.95*volume()*density;
	}

}
