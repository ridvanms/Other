public class Engineer {
  private String name;
  private String company;
  private String id;

  public Engineer(String name, String company, String id) {
    this.name = name;
    this.company = company;
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCompany() {
    return company;
  }

  public void setCompany(String company) {
    this.company = company;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getDigits() {
    String digits = id.replaceAll("[^0-9]", "");
    return digits;
  }

  public String getCity() {
    String city = id.replaceAll("[^a-zA-Zа-яА-Я]", "");
    return city;
  }
  @Override
  public String toString() {
    return "Engineer{" + "name= " + name +
    ", company= " + company + ", id=" + id + '}';
  }
}

