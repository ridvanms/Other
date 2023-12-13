public class HW9_RidvanSaraliev_si647 {
    enum Coffee {
        ESPRESSO("Espresso", 2.50),
        LATE("Late", 3.00),
        CAPUCHINO("Capuchino", 2.80);

        private String name;
        private double price;

        Coffee(String name, double price) {
            this.name = name;
            this.price = price;
        }

        public String getName() {
            return name;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        @Override
        public String toString() {
            return name;
        }
    }

    enum Sandwich {
        BLT("BLT", 1.50),
        TURKEY("Turkey", 2.00),
        CHICKEN("Chicken", 2.50);

        private String name;
        private double price;

        Sandwich(String name, double price) {
            this.name = name;
            this.price = price;
        }

        public String getName() {
            return name;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        @Override
        public String toString() {
            return name;
        }
    }

    static class Order {
        private Coffee coffee;
        private Sandwich sandwich;

        public Order(Coffee coffee, Sandwich sandwich) {
            this.coffee = coffee;
            this.sandwich = sandwich;
        }

        public Coffee getCoffee() {
            return coffee;
        }

        public Sandwich getSandwich() {
            return sandwich;
        }

        public void setCoffee(Coffee coffee) {
            this.coffee = coffee;
        }

        public void setSandwich(Sandwich sandwich) {
            this.sandwich = sandwich;
        }

        public double getPrice() {
            return coffee.getPrice() + sandwich.getPrice();
        }

        @Override
        public String toString() {
            return "Order: " + coffee.getName() + " and " + sandwich.getName();
        }
    }

    public static void main(String[] args) {
        // Create the menu items
        Order[] orders = new Order[3];
        orders[0] = new Order(Coffee.CAPUCHINO, Sandwich.BLT);
        orders[1] = new Order(Coffee.ESPRESSO, Sandwich.CHICKEN);
        orders[2] = new Order(Coffee.LATE, Sandwich.TURKEY);
        
        for (Order order : orders) {
            System.out.println(order.toString());
            System.out.println("Price: " + order.getPrice());
            System.out.println("\n");

        }
    }
}