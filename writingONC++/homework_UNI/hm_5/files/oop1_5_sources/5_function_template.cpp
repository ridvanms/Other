#include <iostream>
using namespace std;
template< typename T>
T sum(T a, T b) {
    return a + b;
 }

int main5()
{
    cout << sum(1, 2) << endl;// ��������� �� ������� �� int
    cout << sum(1.2, 3.4) << endl;// ��������� �� ������� �� double
    cout << sum<double>(1, 2.3) << endl;//��������� �� ������� �� double

    return 0;
}
