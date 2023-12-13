import java.util.ArrayList;
public class SoftwareEngineer extends Engineer implements ReadAndSaveable {
  private ArrayList<String> programmingLanguages;

  public SoftwareEngineer(String name, String company, String id) {
    super(name, company, id);
    programmingLanguages = new ArrayList<>();
  }

  public ArrayList<String> getProgrammingLanguages() {
    return programmingLanguages;
  }

  public void setProgrammingLanguages(ArrayList<String> programmingLanguages) {
    this.programmingLanguages = programmingLanguages;
  }

  public void addLanguage(String language) {
    programmingLanguages.add(language);
  }

  public void removeLanguage(String language) {
    programmingLanguages.remove(language);
  }
  
  public boolean searchPL(String language) {
    return programmingLanguages.contains(language);
  }
  @Override
  public void read(String filename) {

  }
  @Override
  public void save(String filename) {

  }
  //toString metod
  @Override
  public String toString() {
    return "SoftwareEngineer{" +
        "name='" + getName() + '\'' +
        ", company='" + getCompany() + '\'' +
        ", id='" + getId() + '\'' +
        ", programmingLanguages=" + programmingLanguages +
        '}';
  }
}
