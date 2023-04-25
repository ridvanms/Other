#include <iostream>
#include <algorithm>
#include <cstdlib> //srand
#include <ctime> //time
using namespace std;

//функция за извеждане на масив
//използва 2 указателя
//подобно на фунцкциите от algorithm
void print(int* start, int* end) {
    for (int* p{ start }; p < end; p++) {
        cout << *p << " ";
    }
    cout << endl;
}
//Задачата имитира теглене на числа за тото 6/49, 5/35, 6/42.
int main()
{
    system("chcp 1251>nul");
    //Razmeryt na masiv v heap moze da e promenliva
    // vednyz zadaden, ne se izmenya
    int count;
    cout << "Oбщ брой числа?";
    cin >> count; //примерно 49

    //Syzdavame masiv v heap s razmer count
    int* nums = new int[count] {};
    cout << "Изходен масив\n";
    print(nums, nums + count);

    cout << "sizeof nums=" << sizeof(nums) << endl;

    //За масивите в хийпа използваме
    //цикъл по индекс и цикъл по указател

    //Запълваме масива nums с числата от 1 до count
    for (int i{ 0 }; i < count; i++) {
        nums[i] = i + 1;
    }
    cout << "Запълнен изходен масив\n";
    print(nums, nums + count);

    //разбъкваме числата
    //инициализация на генератора на случ. числа
    srand(time(0));
    random_shuffle(nums, nums + count);
    cout << "Разбъркан масив\n";
    print(nums, nums + count);

    int sel_count; //broi izbrani chisla za igra 5 ili 6 za Bulgaria
    cout << "С колко числа ще играете?";
    cin >> sel_count;
   
   //Създаваме масив в хийпа за избраните числа
    int* sel_numbers = new int[sel_count];

    //1 вариант - копирамe първите sel_count числа oт nums 
    //в новия масив 
    for (size_t i = 0; i < sel_count; i++)
    {
        sel_numbers[i] = nums[i];
    }
    cout << "Вар 1: избрани числа\n";
    print(sel_numbers, sel_numbers + sel_count);
    cin.get(); cin.get(); //пауза до натискане на символ
    system("cls"); //Изчистваме екрана
	
    //2 вариант - преди да "изтеглим число" 
    //всеки път разбъркваме останалата част от масива
    //Изтеглянето е условно - числото си остава в масива  nums,
    //но не участва в следващите разбърквания (т.е. не е точно като наживо)
    
    //Започваме отначало -  запълваме масива nums с числата
    //от 1 до count
    for (int i{ 0 }; i < count; i++) {
        nums[i] = i + 1;
    }
    cout << "Запълнен изходен масив\n";
    print(nums, nums + count);

    int k{ 0 }; //k- индекс на поредното число в масива  sel_numbers
                //започваме от нула
     
    //цикъл по броя на числата, с които ще играем
    for (size_t i = 0; i < sel_count; i++)
    {
        //При всяко следващо разбъркване използваме 
        //ОСТАНАЛАТА част от масива, без вече "изтеглените" числа
        //т.е. като начален адрес на масива задаваме nums+i
        random_shuffle(nums+i, nums + count);
        cout << "След " << i + 1 << " разбъркване\n";
        print(nums, nums+count);
        
       //След първото разбъркване  ще вземем ("изтегляме") числото 
      // което е на 1-ва позиция ( с индекс 0)
        sel_numbers[k] = nums[k]; 
        //След второто разбъркване "изтегляме" числото
        // което  е на 2-ра позиция ( с индекс 1)  и т.н.
        k++; //индекс на  елемента, който ще "теглим" след следващото разбъркване
    }
     cout << "Вар 2:  избрани числа\n";
     print(sel_numbers, sel_numbers + sel_count);
     //подреждаме числата по нарастване с библиотечната функция sort
     sort(sel_numbers, sel_numbers + sel_count);
     cout << "Сортирани по нарастване\n";
     print(sel_numbers, sel_numbers + sel_count);

	 delete[] nums; //освобождаваме паметта в хийпа, заемана от nums
	 delete[] sel_numbers;//освобождаваме паметта в хийпа, заемана от sel_numbers
	 nums=nullptr; //"нулираме" указателите
     sel_numbers=nullptr;
    return 0;
}