#include <iostream>
#include <string>
using namespace std;

void info(int course = 1, string spec = "KST", int group = 6) {
    cout << course << " kurs, spec: " << spec << ", grupa:" << group << endl;
}

int main2()
{
    info(); 
    info(2);  //явно - 1 параметър
    info(3, "SI"); //явно - 2 параметърa
    info(4, "SI", 10); //явно - 3 параметърa
   // info(, "SI"); //NE!
    return 0;
}
