import java.util.ArrayList;
import java.util.Scanner;

public class HW10_RidvanSaraliev_si647 {
  public static void main(String[] args) {
        // Създаване на обект SoftwareEngineer с всички написани конструктори
        SoftwareEngineer softwareEngineer = new SoftwareEngineer("Иван", "Фирма", "АА1234София");

        // Изпълнение на всички достъпни методи
        System.out.println(softwareEngineer.getName());
        System.out.println(softwareEngineer.getCompany());
        System.out.println(softwareEngineer.getId());
        System.out.println(softwareEngineer.getDigits());
        System.out.println(softwareEngineer.getCity());
        System.out.println(softwareEngineer.getProgrammingLanguages());

        // Добавяне на програмен език
        softwareEngineer.addLanguage("Java");
        System.out.println(softwareEngineer.getProgrammingLanguages());

        // Премахване на програмен език
        softwareEngineer.removeLanguage("Java");
        System.out.println(softwareEngineer.getProgrammingLanguages());

        // Проверка дали софтуерният инженер владее даден език
        boolean knowsLanguage = softwareEngineer.searchPL("Java");
        System.out.println(knowsLanguage);

        // Създаване на ArrayList от тип SoftwareEngineer и запълване
        ArrayList<SoftwareEngineer> engineers = new ArrayList<>();
        engineers.add(new SoftwareEngineer("Петър", "Фирма1", "ВВ5678Пловдив"));
        engineers.add(new SoftwareEngineer("Мария", "Фирма2", "ГГ9012Варна"));
        engineers.add(new SoftwareEngineer("Георги", "Фирма3", "ДД3456София"));

        // Въвеждане на програмен език от конзолата
        Scanner scanner = new Scanner(System.in);
        System.out.print("Въведете програмен език: ");
        String language = scanner.nextLine();

        // Извеждане на списък с имената, фирмите и града на софтуерните инженери,
        // които владеят въведения език
        for (SoftwareEngineer engineer : engineers) {
            if (engineer.searchPL(language)) {
                System.out.println(engineer.getName() + ", " + engineer.getCompany() + ", " + engineer.getCity());
            }
        }
    }
}