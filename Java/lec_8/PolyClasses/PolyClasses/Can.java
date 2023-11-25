package lect8;

public class Can {
	//член-данни, полета
	private double r; //радиус 
	private double h; //височина
	//член-функцииии (методи)
	public Can(double r, double h) { //конструктор с параметри
		super(); //извиква конструктора на суперкласа Оbject
		this.r = r;
		this.h = h;
	}
	public Can() { //конструктор по подразбиране
//		this.r=0.03;
//		this.h=0.15;
		this(0.03, 0.15); //извикваме друг конструктор на същия клас
		                  //в случая конструктора с 2 параметъра
	}
	//source/ generate getters & setters
	public double getR() {
		return r;
	}
	public void setR(double r) {
		this.r = r;
	}
	public double getH() {
		return h;
	}
	public void setH(double h) {
		this.h = h;
	}
	//source/ generate toString
	@Override
	public String toString() {
		return "радиус="+r+" височина="+h;
	}
	
	//изчислява обема 
	public double volume() {
		return Math.PI*r*r*h;
	}
}
