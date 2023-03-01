#include <iostream>
#include <algorithm>
#include <cstdlib> //srand
#include <ctime> //time
using namespace std;

void print(string* start, string* end) {
    for (string* p{ start }; p < end; p++) {
        cout << *p << " ";
    }
    cout << endl;
}
int main(){
    double x, y;
    double * mypointer;
    mypointer = &x;
    *mypointer = 1.3;
    mypointer = &y;
    *mypointer = 1.3;
    cout << &x <<"<>"<< x << '\n';
    cout << &y <<"<>"<< y << '\n';

    const  double *p2 ;
    p2 = &x;
    cout << p2 << "< - >" << *p2 << endl;


    const int SIZE{ 10 };
    string names[SIZE] {"Ana", "Petur", "Dimo", "Stoqn", "Asen", "Lilqna", "Dimitur", "Miroslav", "Katq", "Denislav"};

    cout << "Pokazvane na elementite v masiva \n ";
    print(names, names + SIZE );
    
    random_shuffle(names, names + SIZE );

    cout << "Sled razburkvane: ";
    print(names, names + SIZE );

    cout<<"Sled razburkvane:"<<"\n";
    cout<<"Poslednite 3 elementa"<<" v masiva"<<endl;

    for(int i = 1;i<=3;i++) cout<<i<<" - "<<names[SIZE-i]<<"\n";

    return 0;
}