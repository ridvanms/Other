class Room {
    private double length;
    private double width;

    public Room(double length, double width) {
        this.length = length;
        this.width = width;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double calculateArea() {
        return length * width;
    }

    public String toString() {
        return "Room[length=" + length + ", width=" + width + "]";
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
        return "Office[length=" + getLength() + ", width=" + getWidth() + ", business=" + business + "]";
    }
}

class HospiceRoom extends Room {
    private int numPersons;

    public HospiceRoom(double length, double width, int numPersons) {
        super(length, width);
        this.numPersons = numPersons;
    }

    public int getNumPersons() {
        return numPersons;
    }

    public void setNumPersons(int numPersons) {
        this.numPersons = numPersons;
    }

    public double areaPerPerson() {
        return calculateArea() / numPersons;
    }

    public String toString() {
        return "HospiceRoom[length=" + getLength() + ", width=" + getWidth() + ", numPersons=" + numPersons + "]";
    }
}

public class HW8_RidvanSaraliev_si647 {
    public static void main(String[] args) {
        Room room = new Room(5, 4);
        Office office = new Office(6, 5, "YouCompany");
        HospiceRoom hospiceRoom = new HospiceRoom(7, 6, 10);

        Room[] rooms = {room, office, hospiceRoom};

        for (Room r : rooms) {
            System.out.println(r.toString());
            if (r instanceof HospiceRoom) {
                HospiceRoom hr = (HospiceRoom) r;
                System.out.println("Area per person: " + hr.areaPerPerson());
            }
        }
    }
}
