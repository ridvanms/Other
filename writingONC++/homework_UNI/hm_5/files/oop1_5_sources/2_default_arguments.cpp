#include <iostream>
#include <string>
using namespace std;

void info(int course = 1, string spec = "KST", int group = 6) {
    cout << course << " kurs, spec: " << spec << ", grupa:" << group << endl;
}

int main2()
{
    info(); 
    info(2);  //���� - 1 ���������
    info(3, "SI"); //���� - 2 ���������a
    info(4, "SI", 10); //���� - 3 ���������a
   // info(, "SI"); //NE!
    return 0;
}
