import java.util.ArrayList;
import java.util.Scanner;

public class HW10_RidvanSaraliev_si647 {
  public static void main(String[] args) {
        // Създаване на обект SoftwareEngineer с всички написани конструктори
        SoftwareEngineer softwareEngineer = new SoftwareEngineer("Ivan", "Firm", "Sofia123222ad");

        System.out.println(softwareEngineer.getName());
        System.out.println(softwareEngineer.getCompany());
        System.out.println(softwareEngineer.getId());
        System.out.println(softwareEngineer.getDigits());
        System.out.println(softwareEngineer.getCity());
        System.out.println(softwareEngineer.getProgrammingLanguages());

        softwareEngineer.addLanguage("Java");
        System.out.println(softwareEngineer.getProgrammingLanguages());

        softwareEngineer.removeLanguage("Java");
        System.out.println(softwareEngineer.getProgrammingLanguages());

        boolean knowsLanguage = softwareEngineer.searchPL("Java");
        System.out.println(knowsLanguage);

        ArrayList<SoftwareEngineer> engineers = new ArrayList<>();
        engineers.add(new SoftwareEngineer("Peter", "firm1", "Plovdiv4324"));
        engineers.add(new SoftwareEngineer("Peter1", "firm2", "Plovdiv4"));
        engineers.add(new SoftwareEngineer("Peter2", "firm3", "aldkfjPlovdiv"));
        
        Scanner scanner = new Scanner(System.in);
        System.out.print("Add programing language: ");
        String language = scanner.nextLine();

        for (SoftwareEngineer engineer : engineers) {
            if (engineer.searchPL(language)) {
                System.out.println(engineer.getName() + ", " + engineer.getCompany() + ", " + engineer.getCity());
            }
        }
    }
}