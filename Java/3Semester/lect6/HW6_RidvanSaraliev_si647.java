public class HW6_RidvanSaraliev_si647 {
    public static void main(String[] args) {
        String result1 = getTotalString("OOP2", "KM");
        String result2 = getTotalString(result1, "BD", "CAA", "II");

        System.out.println("Took exams for the first semester: " + result1);
        System.out.println("Took exams for the both semesters: " + result2);
    }

    public static String getTotalString(String... s) {
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < s.length; i++) {
        sb.append(s[i]);
        if (i < s.length - 1) {
          sb.append(", ");
        } else {
          sb.append("!");
        }
      }
      return sb.toString();
    }
}

class Stock {
    private String title;
    private double price;
    private int count;

    public Stock() {
        // Default constructor
    }

    public Stock(String title, double price, int count) {
        this.title = title;
        this.price = price;
        this.count = count;
    }

    public void input() {
        // Input data from console
    }

    public void input(String filename) {
        // Input data from file
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        if (count < 0) {
            throw new IllegalArgumentException("Count cannot be negative");
        }
        this.count = count;
    }

    public double total() {
        return price * count;
    }

    public void discount(int percent) {
        double discountAmount = price * percent / 100;
        price -= discountAmount;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "title='" + title + '\'' +
                ", price=" + price +
                ", count=" + count +
                '}';
    }
}
