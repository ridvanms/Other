class Room {
  double length;
  double width;

  public Room(double length, double width) {
    this.length = length;
    this.width = width;
  }

  public String getLength() {
    return "" + this.length;
  }

  public String getWidth() {
    return "" + this.width;
  }

  public void setWidth(double width) {
    this.width = width;
  }

  public void setLength(double length) {
    this.length = length;
  }

  public double calculateArea() {
    return this.width * this.length;
  }

  public String toString() {
    return "Room: " + this.length + "X" + this.width;
  }
}

class Office extends Room {
  private String business;

  public Office(double length, double width, String business) {
    super(length, width);
    this.business = business;
  }
  
  public String getBusiness() {
    return business;
  }

  public void setBusiness(String business) {
    this.business = business;
  }

  public String toString() {
    return "Office: " + this.getLength() + "X" + this.getWidth() + " and " + "business = " + this.getBusiness();
  }
}



public class practice {
  public static void main(String[] args) {
    Room room = new Room(20, 14.5);
    Office office = new Office(13, 23.5, "seller");
    Office office2 = new Office(113, 33.5, "barber");

    Room[] rooms = {room,office,office2};
    for (Room r : rooms) {
      System.out.println(r.toString());
    }
  }
}
