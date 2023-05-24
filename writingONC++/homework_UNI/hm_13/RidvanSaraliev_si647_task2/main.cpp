#include <iostream>
#include <cstdlib>
#include <map>
#include <string>
#include <utility>

void print(std::map<std::string,double>myMap)
{
    for(auto a_pair : myMap)
    {
        std::cout<<a_pair.first<<"*-*"<<a_pair.second<<std::endl;
    };
    std::cout<<std::endl;
}
void show(std::map<std::string,double>myMap)
{
    for(auto it = myMap.begin();it != myMap.end();++it)
    {
        std::cout<<it->first<<"<->" << it->second<<std::endl;
    };
    std::cout<<std::endl;
}

int main()
{
   std::map<std::string,double>students{
       {"Gosho233",4},
       {"Pesho231",3},
       {"Ivan423",5}
   }
   std::pair<std::string,double>student1{"Ico123",5.23};
   std::pair<std::string,double>student2;
   student2.first = "Nina432";
   student2.second = 5.43;
   students.insert(student1);
   students.insert(student2);
   print(students);
   students.emplace("Iker323",3.44);
   show(students);
   std::string FN;
   std::cout<<"Insert Facult number "<<std::endl;
   std::cin>>FN;
   auto it = students.find(FN);
   if(it != students.end())
   {
       std::cout<<it->second<<std::endl;
   }
   else
   {
       std::cout<<FN<< "  "<<std::endl;
   }
    students.erase(next(students.begin(),1));
    print(students);
    students.erase("Iker323");

    return EXIT_SUCCESS;
}