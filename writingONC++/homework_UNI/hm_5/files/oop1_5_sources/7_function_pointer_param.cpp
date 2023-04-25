#include <iostream>
#include <string>
using namespace std;

//Функция, която прилага фунцията, подадена като параметър
// върху всички елементи на масива
//параметърът е указател към функция, която връща int
//и има един параметър от тип int (цяло число)
void changeArray(int arr[], int n, int (*fp) (int)) {
    for (int i{ 0 }; i < n; i++) {
        arr[i] = fp(arr[i]);
    }
}
//Функции, чийто прототип съвпада с този, 
// зададен с параметъра-указател към функция
int f1(int x) {
    return x + 1;
}
int f2(int x) {
    return x * 9;
}
int main7()
{
    int numbers[]{ 7,1,4, 8, 5 };

    //Броят елементи на масива определяме по  инициализиращия списък
    const int SIZE = sizeof numbers / sizeof numbers[0];
    //  const int SIZE = sizeof numbers / *numbers;

    //Извеждаме масива
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //Извикваме changeArray с трети параметър функцията f1
    changeArray(numbers, SIZE, f1);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //Извикваме changeArray с трети параметър функцията f2
    changeArray(numbers, SIZE, f2);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //ламбда функция - дефинираме я на мястото на използване
    //явно задаване на типа нa резултата
    //auto f3 = [](int x)-> int {return x - 5; }; 
    auto f3 = [](int x) {return x - 5; };

    //Извикваме changeArray с трети параметър функцията f3
    changeArray(numbers, SIZE, f3);
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    //Ламбда-функцията може да се зададе директно при извикването
    changeArray(numbers, SIZE, [](int x) {return x % 2; });
    for (auto num : numbers) cout << num << " ";
    cout << endl;

    return 0;
}